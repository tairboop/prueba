import { Injectable, Logger } from '@nestjs/common'
import { DataSource, ILike } from 'typeorm'
import { CreateCatDto, UpdateCatDto } from '../dto'
import { Cat } from '../entities'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { ApiResponse, PaginationMeta } from 'src/core/response'
import { Messages } from 'src/common/response-messages'

@Injectable()
export class CatsRepository {
  constructor(private dataSource: DataSource) {}

  async create(catDto: CreateCatDto) {
    const cat = new Cat(catDto)
    const response = await this.dataSource
      .getRepository(Cat)
      .save(new Cat({ ...catDto }))
    return response
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, page, search } = paginationDto
    const status = { isActive: true }
    const where = search
      ? {
          where: [
            { name: ILike(`%${search}%`), ...status },
            { color: ILike(`%${search}%`), ...status },
            { raza: ILike(`%${search}%`), ...status },
          ],
        }
      : { where: status }

    const [data, total] = await this.dataSource
      .getRepository(Cat)
      .findAndCount({
        ...where,
        take: limit,
        skip: offset,
        order: { id: 'ASC' },
      })

    const totalPages = Math.ceil(total / limit)

    if (data.length === 0) {
      return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    }

    const pagination: PaginationMeta = {
      total_records: total,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    }

    return ApiResponse.success(data, Messages.SUCCESS_LIST, pagination)
  }

  async findOne(id: number) {
    const cat = await this.dataSource
      .getRepository(Cat)
      .findOne({ where: { id, isActive: true } })
    return cat
  }

  async update(id: number, catDto: UpdateCatDto) {
    const cat = await this.findOne(id)
    if (!cat) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    const data = await this.dataSource.getRepository(Cat).update(id, catDto)
    return ApiResponse.success(data, Messages.SUCCESS_UPDATE)
  }

  async remove(id: number) {
    const cat = await this.findOne(id)
    if (!cat) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    const data = await this.dataSource.getRepository(Cat).update(id, { 
        isActive: false 
    })
    return ApiResponse.success(data, Messages.SUCCESS_DELETE)
  }
}

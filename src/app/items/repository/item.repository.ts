import { Injectable, Logger } from '@nestjs/common'
import { DataSource, ILike } from 'typeorm'
import { CreateItemDto, UpdateItemDto } from '../dto'
import { Item } from '../entities'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { ApiResponse, PaginationMeta } from 'src/core/response'
import { Messages } from 'src/common/response-messages'

@Injectable()
export class ItemsRepository {
  constructor(private dataSource: DataSource) {}

  async create(itemDto: CreateItemDto) {
    const item = new Item(itemDto)
    const response = await this.dataSource
      .getRepository(Item)
      .save(new Item({ ...item }))
    return response
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset, page, search } = paginationDto

    const where = search
      ? {
          where: [
            { title: ILike(`%${search}%`) },
            { description: ILike(`%${search}%`) },
          ],
        }
      : {}

    const [data, total] = await this.dataSource
      .getRepository(Item)
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
    const item = await this.dataSource
      .getRepository(Item)
      .findOne({ where: { id } })

    return item
  }

  async update(id: number, itemDto: UpdateItemDto) {
    const item = await this.findOne(id)
    if (!item) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)

    await this.dataSource.getRepository(Item).update(id, itemDto)

    const updated = await this.findOne(id)

    return ApiResponse.success(updated, Messages.SUCCESS_UPDATE)
  }

  async remove(id: number) {
    const item = await this.findOne(id)
    if (!item) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)

    const data = await this.dataSource.getRepository(Item).delete({ id })

    return ApiResponse.success(data, Messages.SUCCESS_DELETE)
  }
}

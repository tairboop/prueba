import { Inject, Injectable } from '@nestjs/common'
import { CreateItemDto, UpdateItemDto } from '../dto'
import { ItemsRepository } from '../repository'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { ApiResponse } from 'src/core/response'
import { Messages } from 'src/common/response-messages'

@Injectable()
export class ItemsService {
  constructor(
    @Inject(ItemsRepository)
    private itemRepository: ItemsRepository
  ) {}

  async create(createItemDto: CreateItemDto) {
    const resp = await this.itemRepository.create(createItemDto)
    return resp
  }

  async findAll(paginationDto: PaginationDto) {
    const resp = await this.itemRepository.findAll(paginationDto)
    return ApiResponse.success(resp)
  }

  async findOne(id: number) {
    const resp = await this.itemRepository.findOne(id)
    if (!resp) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    return ApiResponse.success(resp)
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne(id)
    if (!item) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    const resp = await this.itemRepository.update(id, updateItemDto)
    return resp
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOne(id)
    if (!item) return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
    const resp = await this.itemRepository.remove(id)
    return resp
  }
}

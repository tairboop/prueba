import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Logger,
} from '@nestjs/common'
import { ItemsService } from '../service'
import { CreateItemDto, UpdateItemDto } from '../dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { IdDto } from 'src/core/dto/common.dto'

@ApiTags('Items API')
@Controller('items')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({
    summary: 'Api to get all items',
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.itemsService.findAll(paginationDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Api to get an item by id',
  })
  async findOne(@Param() params: IdDto) {
    const { id } = params
    return this.itemsService.findOne(id)
  }

  @Post()
  @ApiOperation({
    summary: 'Api to create a new item with its properties',
  })
  @ApiBody({
    type: CreateItemDto,
    description: 'Create a new item',
    required: true,
  })
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto)
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Api to update an item by id',
  })
  @ApiBody({
    type: UpdateItemDto,
    description: 'Update an item',
    required: true,
  })
  update(@Param() parans: IdDto, @Body() updateItemDto: UpdateItemDto) {
    const { id } = parans
    return this.itemsService.update(id, updateItemDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Api to delete an item by id',
  })
  async remove(@Param() id: IdDto) {
    return await this.itemsService.remove(+id)
  }
}

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { CreateItemDto } from './create-item.dto'
import { IsEnum, IsOptional } from 'class-validator'
import { Status } from 'src/core/enums/status.enum'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiPropertyOptional({ enum: Status })
  @IsOptional()
  @IsEnum(Status, { message: 'status must be active or inactive' })
  status?: Status
}

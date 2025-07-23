import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive, IsString } from 'class-validator'

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1

  @ApiPropertyOptional({
    description: 'Number of items',
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 10

  @ApiPropertyOptional({
    description: 'Search term',
    default: '',
  })
  @IsOptional()
  @IsString()
  search?: string

  get offset(): number {
    return (this.page - 1) * this.limit
  }
}

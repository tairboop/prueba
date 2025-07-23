import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Min } from 'class-validator'

export class IdDto {
  @ApiProperty({
    description: 'Id of element',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number
}

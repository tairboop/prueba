import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString } from 'class-validator'

export class StreamDto {
  @ApiProperty({
    description: 'Stream key',
    example: 'aebadwa',
  })
  @Type(() => String)
  @IsString()
  streamKey: string
}

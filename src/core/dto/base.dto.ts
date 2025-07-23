import { ApiProperty } from '@nestjs/swagger'
import { Status } from 'src/core/enums/status.enum'

export class BaseDto {
  @ApiProperty({
    description: 'Status of the entity',
    enum: Status,
    example: Status.ACTIVE,
    readOnly: true,
  })
  status: Status

  @ApiProperty({
    description: 'Creation date (read-only)',
    example: '2025-07-15',
    readOnly: true,
  })
  createdAt: string

  @ApiProperty({
    description: 'Last update date (read-only, nullable)',
    example: '2025-07-20',
    nullable: true,
    readOnly: true,
  })
  updatedAt: string | null
}

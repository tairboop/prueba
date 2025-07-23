import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ImageUri } from 'src/common'
import { BaseDto } from 'src/core/dto/base.dto'

export class CreateItemDto extends BaseDto {
  @ApiProperty({
    description: 'Item title',
    example: 'Black T-shirt',
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Detailed description of the item',
    example: 'Black cotton T-shirt, size M',
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiPropertyOptional({
    description: 'Image URL of the item',
    example: 'https://myapp.com/images/item.png',
    default: ImageUri,
  })
  @IsOptional()
  @IsString()
  imageUri?: string = ImageUri

  @ApiPropertyOptional({
    description: 'Whether the item is public',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  public?: boolean = true
}

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ImageUri } from 'src/common'
import { Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { Binary } from 'typeorm'
export class CreateCatDto {
  //valores predefinidos del swagger -> @
  @ApiProperty({
    description: 'cat name',
    example: ' garfy'
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: ' color cat',
    example:'naranja'
  })
  @IsNotEmpty()
  @IsString()
  color: string

  @ApiProperty({
    description:'raza cat?',
    example:'meztizo'
  })
  @IsNotEmpty()
  @IsString()
  raza: string

  @ApiProperty({
    description:'edad:',
    example: '3'
  })
  @IsNotEmpty()
  @IsNumber()
  edad: number

  @ApiProperty({
    description:'peso cat:',
    example:'3.4'
  })
  @IsNotEmpty()
  peso: number

  @ApiProperty({
    description:'vacunas?',
    example: 'false',
  })
  @IsOptional()
  @IsBoolean()
  vacuna: boolean

  @ApiProperty({
    description:'imagen cat',
    type:'string',
    format:'binary'
  })
  file: any //Express.Multer.File
  
}

import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CreateCatDto } from './create-cat.dto'

export class UpdateCatDto extends PartialType(CreateCatDto) {}
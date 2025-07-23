import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator'
import { ImageUri } from 'src/common'
import { BaseEntity } from 'src/core/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { STATUS } from '../constant/constants'

@Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  title: string

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string

  @Column({ default: ImageUri })
  @IsString()
  imageUri: string

  @Column({ default: true })
  @IsBoolean()
  public: boolean

  constructor(item: Partial<Item>) {
    super()
    Object.assign(this, item)
    this.status = this.status ?? STATUS.ACTIVE
  }
}

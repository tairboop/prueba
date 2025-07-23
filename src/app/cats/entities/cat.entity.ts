import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  IsUUID
} from 'class-validator'

import { ImageUri } from 'src/common'
import {
  BeforeInsert,
  Column,
  Entity,
  Long,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number

  @Column() 
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id_uuid: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string

  @Column()
  @IsString()
  @IsNotEmpty()
  color: string

  @Column()
  @IsString()
  @IsNotEmpty()
  raza: string

  @Column()
  @IsInt()
  @IsNotEmpty()
  edad: number

  @Column('float')
  @IsNotEmpty()
  peso: number
  
  @Column({ default: false })
  @IsBoolean()
  vacuna: boolean

  @Column({
    default:'http://127.0.0.1/'
  })
  @IsString()
  @IsNotEmpty()
  urlimg: string

  @Column({default: true})
  isActive: boolean
  
  @Column()
  @IsDate()
  createdAt: Date

  @Column()
  @IsDate()
  updatedAt: Date

  @BeforeInsert()
  updateTimestamps() {
    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }

  constructor(Cat: Partial<Cat>) {
    Object.assign(this, Cat)
  }
}

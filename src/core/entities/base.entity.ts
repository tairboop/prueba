import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Status } from '../enums/status.enum'

export abstract class BaseEntity {
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status

  @CreateDateColumn({ type: 'date' })
  createdAt: string

  @UpdateDateColumn({ type: 'date', nullable: true })
  updatedAt: string | null
}

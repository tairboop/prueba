import { Module } from '@nestjs/common'
import { ItemsService } from './service'
import { ItemsController } from './controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './entities'
import { ItemsRepository } from './repository'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemsRepository],
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],
})
export class ItemsModule {}

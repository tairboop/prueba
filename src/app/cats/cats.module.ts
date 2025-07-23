import { Module } from '@nestjs/common'
import { CatsController } from './controller'
import { CatsService } from './service'
import { CatsRepository } from './repository'
import { Cat } from './entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  imports: [TypeOrmModule.forFeature([Cat]), AuthModule],
})
export class CatsModule {}
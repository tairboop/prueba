// stream.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import streamConfig from './config/stream.config'
import { StreamController } from './controller/stream.controller'
import { StreamService } from './service/stream.service'
import { StreamRepository } from './repository/stream.repository'

@Module({
  imports: [ConfigModule.forFeature(streamConfig)],
  controllers: [StreamController],
  providers: [StreamService, StreamRepository],
})
export class StreamModule {}

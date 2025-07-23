import { Module } from '@nestjs/common'
import { ItemsModule } from './items/items.module'
import { LoggerModule } from 'src/core/logger/logger.module'
import { StreamModule } from './stream/stream.module'
import { CatsModule} from './cats/cats.module'

@Module({
  imports: [LoggerModule, ItemsModule, StreamModule, CatsModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}

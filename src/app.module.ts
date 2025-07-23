import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/user.module'
import { ApplicationModule } from './app/application.module'
import { AppLogger } from './core/logger/logger.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppModule {}

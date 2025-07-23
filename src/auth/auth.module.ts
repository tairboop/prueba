import { Module } from '@nestjs/common'
import { AuthController, StatusController } from './controller'
import { AuthService } from './service'
import { UsersModule } from 'src/users/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(config.get('JWT_EXPIRATION')),
        },
      }),
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [StatusController, AuthController],
  exports: [AuthService, AuthGuard, JwtModule],
})
export class AuthModule {}

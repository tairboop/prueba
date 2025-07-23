import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Messages } from 'src/common/response-messages'
import { ApiResponse } from 'src/core/response'
import { UsersService } from 'src/users/service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username)
    if (user?.password !== pass)
      return ApiResponse.error(Messages.INVALID_CREDENTIALS)

    const payload = { sub: user.userId, username: user.username }
    const access_token = await this.jwtService.signAsync(payload)
    const response = {
      token: access_token,
    }

    return ApiResponse.success(response, Messages.SUCCESS_LOGIN)
  }
}

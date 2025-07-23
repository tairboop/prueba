import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../service'
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger'
import { AuthGuard } from '../auth.guard'
import { ApiResponse } from 'src/core/response'
import { Messages } from 'src/common/response-messages'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
      example: {
        username: 'admin',
        password: '123456',
      },
    },
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    if (!req.user) return ApiResponse.error(Messages.INVALID_USER_CREDENTIALS)

    return ApiResponse.success(req.user, Messages.SUCCESS_LOGIN)
  }
}

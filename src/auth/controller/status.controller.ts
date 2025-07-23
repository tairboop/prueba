import { Controller, Get } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Messages } from 'src/common/response-messages'
import { ApiResponse } from 'src/core/response'

@Controller()
export class StatusController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  status() {
    return ApiResponse.success(Messages.SUCCESS_HEALTH)
  }
}

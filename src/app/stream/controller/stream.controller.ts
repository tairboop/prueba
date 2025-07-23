// controllers/stream.controller.ts
import { Controller, Get, Param } from '@nestjs/common'
import { StreamDto } from '../dto/stream.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { StreamService } from '../service/stream.service'

@ApiTags('Stream')
@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get(':streamKey')
  @ApiOperation({ summary: 'Get HLS playlist in base64 format' })
  async getPlaylist(@Param() params: StreamDto) {
    const { streamKey } = params
    return this.streamService.getPlaylistBase64(streamKey)
  }
}

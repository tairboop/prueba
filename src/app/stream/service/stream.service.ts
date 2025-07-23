import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import streamConfig from '../config/stream.config'
import { StreamRepository } from '../repository/stream.repository'
import { ApiResponse } from 'src/core/response'
import { Messages } from 'src/common/response-messages'

@Injectable()
export class StreamService {
  constructor(
    @Inject(streamConfig.KEY)
    private readonly config: ConfigType<typeof streamConfig>,
    private readonly streamRepository: StreamRepository
  ) {}

  async getPlaylistBase64(streamKey: string) {
    const { host, port, file } = this.config.hls
    const urlStr = `${host}:${port}/hls/${streamKey}/${file}`
    Logger.log(`Fetching playlist from: ${urlStr}`)

    try {
      const data = await this.streamRepository.fetchPlaylist(urlStr)
      //TODO: Remove base64 use directly a decoded string
      //const response = Buffer.from(urlStr).toString('base64')
      const response = urlStr
      return ApiResponse.success(response, Messages.SUCCESS_DEFAULT)
    } catch (error) {
      Logger.error(error)
      if (error instanceof NotFoundException) {
        return ApiResponse.error(Messages.EXCEPTION_NOT_FOUND)
      }
      return ApiResponse.error(Messages.EXCEPTION_INTERNAL_SERVER_ERROR)
    }
  }
}

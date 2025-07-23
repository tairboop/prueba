import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AppLogger extends Logger {
  debug(message: any) {
    super.debug(`[DEBUG]: ${message}`)
  }

  log(message: any) {
    super.log(`[INFO]: ${message}`)
  }

  error(message: any, trace?: string) {
    super.error(`[ERROR]: ${message}`, trace)
  }

  warn(message: any) {
    super.warn(`[WARNING]: ${message}`)
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import * as http from 'http'
import * as https from 'https'
import { URL } from 'url'

@Injectable()
export class StreamRepository {
  async fetchPlaylist(urlStr: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const url = new URL(urlStr)
        const client = url.protocol === 'https:' ? https : http

        const req = client.get(url, (res) => {
          if (res.statusCode === 404) {
            reject(new NotFoundException('Playlist not found'))
            return
          }

          if (res.statusCode !== 200) {
            reject(new Error(`HTTP status ${res.statusCode}`))
            return
          }

          let data = ''
          res.setEncoding('utf8')
          res.on('data', (chunk) => (data += chunk))
          res.on('end', () => resolve(data))
        })

        req.on('error', (err) => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }
}

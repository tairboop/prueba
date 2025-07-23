// src/config/stream.config.ts
import { registerAs } from '@nestjs/config'

export default registerAs('stream', () => ({
  hls: {
    host: process.env.HLS_HOST || 'http://localhost',
    port: parseInt(process.env.HLS_PORT || '8080', 10),
    file: 'index.m3u8',
  },
}))

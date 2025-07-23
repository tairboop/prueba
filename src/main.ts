import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { logLogo } from './utils/logging/logging.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'error', 'debug'],
  })

  const port = process.env.PORT || 3000
  const host = process.env.HOST || '0.0.0.0'
  const originFront = process.env.FRONTEND_URL || 'http://localhost:3030'

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  app.enableCors({
    origin: [originFront],
    credentials: true,
  })

  dotenv.config()
  const config = new DocumentBuilder()
    .setTitle('StreamCast API')
    .setDescription('The StreamCast API description')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token'
    )
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  const logger = new Logger('Bootstrap')
  await app.listen(port, host)

  logLogo(logger, Number(port), host)
}
bootstrap()

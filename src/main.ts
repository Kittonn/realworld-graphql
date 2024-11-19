import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { PrismaClientExceptionFilter } from '@/common/filters';
import { EnvService } from '@/modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  const logger = new Logger('NestApplication');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  await app.listen(port);

  logger.log(`GraphQL application is running on: ${await app.getUrl()}`);
}

bootstrap();

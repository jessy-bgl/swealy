import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { MongoExceptionsFilter } from './infrastructure/common/exceptions/MongoExceptionsFilter';
import { validationPipe } from './infrastructure/common/pipes/validation.pipe';
import { HTTP_PORT } from './infrastructure/config/constants';

async function bootstrap() {
  // create NestJS app server based on Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // use pipes
  app.useGlobalPipes(validationPipe);

  // use global-scope mongo exceptions filter
  app.useGlobalFilters(new MongoExceptionsFilter());

  // use global prefix 'api'
  app.setGlobalPrefix('/api');

  // start the web server
  await app.listen(HTTP_PORT, '0.0.0.0');
  console.log(`API server is running on ${await app.getUrl()}`);
}
bootstrap();

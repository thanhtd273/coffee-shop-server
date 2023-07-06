import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as cacheUtil from './utils/cache';
require('./utils/cache');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log(`App running on port 3000`);
  });
}
bootstrap();

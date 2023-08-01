import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './socket/socket.adapter';
import helmet from 'helmet';
import * as crurf from 'csurf';
import * as xss from 'xss-clean';
import * as mongoSanitize from 'express-mongo-sanitize';
import * as hpp from 'hpp';
import { config } from 'dotenv';

// import './client';
require('./utils/cache');
const port = process.env.PORT || 3000;
config({ path: '../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors
  // const redisAdapter = new RedisIoAdapter(app);
  // await redisAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisAdapter);

  app.use(helmet());
  app.use(xss());
  app.use(mongoSanitize());
  app.use(hpp({ whitelist: 'price' }));

  await app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}
bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { ClientModule } from './client/client.module';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    SocketModule,
    ClientModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const datbaseURL = configService
          .get('DATABASE')
          .replace('<PASSWORD>', configService.get('DATABASE_PASSWORD'));
        return {
          uri: datbaseURL,
        };
      },
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}

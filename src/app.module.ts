import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { SocketService } from './controller/socket/socket.service';
import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: 'config.env', load: [configuration] }),
    MongooseModule.forRoot(
      'mongodb+srv://trinh-dinh-thanh:ceWMM6cEFXy2798p@app-cluster.uuvwytq.mongodb.net/coffee-shop?retryWrites=true&w=majority',
    ),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    SocketService,
  ],
})
export class AppModule {}

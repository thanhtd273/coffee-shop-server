import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';
import { SocketGateway } from './socket.gateway';

@Module({
  providers: [SocketService, SocketGateway],
  controllers: [SocketController],
})
export class SocketModule {}

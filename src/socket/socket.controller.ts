import { Controller, Post } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

const port = process.env.PORT;
@Controller('socket')
export class SocketController {
  // @WebSocketGateway(port, {namespace: 'events', transports: ['websocket']})
  @Post()
  sendMessage() {}
}

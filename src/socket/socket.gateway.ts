import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagePayload } from './interfaces/message-payload.interface';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join-conversation')
  handleJoinConversation(socket: Socket, payload: MessagePayload) {
    socket.emit('send-message', 'Hello everyone in room test');
  }

  @SubscribeMessage('leave-conversation')
  handleLeaveConversation(
    socket: Socket,
    @MessageBody() payload: MessagePayload,
  ) {
    socket.leave(payload.conversationId);
  }

  @SubscribeMessage('typing')
  handleTyping(socket: Socket, payload: MessagePayload) {
    socket.broadcast.emit('typing', payload.conversationId, 'I am typing');
  }

  @SubscribeMessage('not-typing')
  handleNotTyping(socket: Socket, payload: MessagePayload) {
    socket.emit('not-typing', payload);
  }

  @SubscribeMessage('send-message')
  handleSendMessage(socket: Socket, payload: string) {
    socket.emit('reply-message', 'Reply from server');
  }
}

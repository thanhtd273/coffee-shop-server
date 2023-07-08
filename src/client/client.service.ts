import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Manager, Socket } from 'socket.io-client';

@Injectable()
export class ClientService {
  constructor(private readonly configService: ConfigService) {}
  sendMessage(payload: any) {}
}

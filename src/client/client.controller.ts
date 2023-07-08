import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @Post('send-message')
  sendMessage(@Body() data: ClientDto, @Res() res: Response) {
    // this.clientService.sendMessage(data);
    return res.status(200).send(data);
  }
}

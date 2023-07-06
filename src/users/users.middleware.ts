import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  use(req: any, res: any, next: () => void) {
    next();
  }
}

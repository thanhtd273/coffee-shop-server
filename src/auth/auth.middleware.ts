import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response, request } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService, // @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    const user = await this.authService.protect(token, next);
    const request: any = <any>req;
    request.user = user;
    next();
  }
}

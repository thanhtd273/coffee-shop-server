import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService, // @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // try {
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    this.authService.protect(token, next);
    next();
  }
}

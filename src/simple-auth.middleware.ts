import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SimpleAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization');
		
    if (token !== process.env.AUTH_TOKEN) {
      res.statusCode = 401;
      res.send('Unauthorized');
      return;
    }
		
    next();
  }
}

import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  ready(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'Welcome to Tripp',
      code: HttpStatus.OK,
    });
  }
}

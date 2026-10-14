import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/products")
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("/products")
  postHello(): string {
    return this.appService.postHello();
  }
}

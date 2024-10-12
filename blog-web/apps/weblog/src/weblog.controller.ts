import { Controller, Get } from '@nestjs/common';
import { weblogService } from './weblog.service';

@Controller()
export class weblogController {
  constructor(private readonly blogService: weblogService) {}

  @Get()
  getHello(): string {
    return this.blogService.getHello();
  }
}

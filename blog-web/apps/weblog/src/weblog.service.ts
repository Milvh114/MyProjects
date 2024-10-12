import { Injectable } from '@nestjs/common';

@Injectable()
export class weblogService {
  getHello(): string {
    return 'Hello World!';
  }
}

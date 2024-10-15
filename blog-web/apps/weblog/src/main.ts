import { NestFactory } from '@nestjs/core';
import { weblogModule } from './weblog.module';

async function bootstrap() {
  const app = await NestFactory.create(weblogModule);
  await app.listen(3000);
}
bootstrap();

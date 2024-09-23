import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 3001;

  await app.listen(port);
  Logger.log(`Server Started in Port : ${port}`)
}
bootstrap();

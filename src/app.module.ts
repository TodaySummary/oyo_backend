import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OyoModule } from './oyo/oyo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    OyoModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OyoController } from './oyo.controller';
import { OyoService } from './oyo.service';
import { OpenaiModule } from 'src/util/openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [OyoController],
  providers: [OyoService],
})
export class OyoModule {}

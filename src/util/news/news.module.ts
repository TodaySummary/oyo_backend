import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getNews(keyword: string) {
    const keywordUTF = Buffer.from(keyword).toString('utf-8');

    const url = `https://openapi.naver.com/v1/search/news.json?query=${keywordUTF}&display=100`;
    const config: AxiosRequestConfig = {
      headers: {
        'X-Naver-Client-Id': process.env.NEWS_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NEWS_CLIENT_SECRET,
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.get(url, config).pipe(
        catchError((error: AxiosError) => {
          Logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}

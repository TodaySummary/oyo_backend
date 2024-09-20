import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import axios, { AxiosRequestConfig } from 'axios';

import { Items } from '../../oyo/dto/response/items';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getNews(keyword: string) {
    const keywordUTF = Buffer.from(keyword).toString('utf-8');

    const url = `https://openapi.naver.com/v1/search/news.json?query=${keywordUTF}&display=50`;
    const config: AxiosRequestConfig = {
      headers: {
        'X-Naver-Client-Id': process.env.NEWS_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NEWS_CLIENT_SECRET,
      },
    };

    const response = await axios.get<Items>(url, config);
    
    return response;
  }
}

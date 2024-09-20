import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      project: process.env.OPENAI_PROJECT,
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendGpt(
    messages: Array<ChatCompletionMessageParam>,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    return completion;
  }
}

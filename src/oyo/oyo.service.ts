import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/util/openai/openai.service';
import { GenerateTripDto } from './dto/request/generate-trip.dto';
import { Plan, Plans } from './dto/response/trip-response.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class OyoService {
  constructor(private openaiService: OpenaiService) {}

  async generateTripPlan(generateTripDto: GenerateTripDto): Promise<Plans> {
    const { area, places, travelTime } = generateTripDto;

    const gpt = await this.openaiService.sendGpt([
      {
        role: 'system',
        content:
          '당신은 여행 일정 플래너입니다. 사용자가 제공한 여행지, 꼭 가고싶은 장소, 여행일수를 바탕으로 하루 단위로 세부적인 일정을 정하세요. 규칙은 다음과 같습니다.\n' +
          '- 하루 일정은 매일 오전 8시부터 오후 10시까지\n' +
          '- 꼭 가고 싶은 장소는 필수로 배치해야하며 여행 일수에 걸쳐 적절히 분배하세요.\n' +
          '- 적절한 시간에 식사(아침: 8시, 점심: 12시, 저녁 7시)를 추천하세요.\n' +
          '- 식사 시간은 항상 1시간으로 고정입니다. 나머지 시간은 적절히 조율하세요\n' +
          '- 여유 시간이 있을 경우, 근처의 명소나 휴식을 취할 수 있는 활동을 추천하세요\n' +
          '- 장소 간 이동 시간을 합리적으로 고려하세요.\n' +
          '- 각 하루마다의 일정은 전부 있어야 하며 빠지는 날이 없어야 합니다.\n' +
          '- 각 일정은 식사외에는 중복된 장소가 없어야 합니다.' +
          '- 여행 계획은 JSON형태로 보내주어야 하며 형식는 다음과 같습니다. "절대로 이 형식에서 추가되거나 변형되면 안됩니다. 이 형식 그대로 클라이언트에게 전달될 예정이기 때문입니다."' +
          '{ plan : [ { start: "관광 명소나 경험할 만한 활동을 시작하는 시간", end: "관광 명소나 경험할 만한 활동에서 떠나가거나 끝내는 시간", place: "도착한 관광명소나 경험할 만한 활동" }, ] }' +
          '이 형태에 대한 추가적인 설명으로는 1개의 plan값 내부에 모든 계획이 다 있어야 합니다. 즉, plan이라는 key값은 1개만 필요합니다.\n' +
          '- 형태는 JSON형태이지만 출력은 String으로 JSON의 형태만 갖춰서 출력해야합니다.\n' +
          '출력된 모든 값은 즉시 JSON.parse함수에 들어갈 예정이니 착오가 없어야 합니다.\n' +
          '값을 출력할 때에는 서론없이 JSON형태의 값만이 전송되어야 합니다.\n' +
          '세부 값은 전부 한국어로 출력되어야 합니다.\n',
      },
      {
        role: 'user',
        content: `여행장소 : ${area} 꼭 가보고 싶은 장소 : ${places} 여행 일수 : ${travelTime}`,
      },
    ]);

    return JSON.parse(gpt.choices[0].message.content) as Plans;
  }

  async generateTripExcel(generateTripDto: GenerateTripDto): Promise<Buffer> {
    const wb = XLSX.utils.book_new();

    const newWorksheet = XLSX.utils.json_to_sheet(
      (await this.generateTripPlan(generateTripDto)).plan,
    );

    XLSX.utils.book_append_sheet(wb, newWorksheet, '여행계획');

    const wbOptions: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
    const wbout = XLSX.write(wb, wbOptions);
    return Buffer.from(wbout, 'base64');
  }
}

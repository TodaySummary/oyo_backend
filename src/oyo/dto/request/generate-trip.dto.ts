import { IsNotEmpty, IsNumber } from 'class-validator';

export class GenerateTripDto {
  @IsNotEmpty({ message: "여행지는 꼭 넣어주셔야합니다." })
  area: string;

  places: string;

  @IsNumber({}, { message: "여행시간은 오직 숫자여야 합니다." })
  @IsNotEmpty({ message: "여행을 떠날때에는 하루 이상의 시간을 넣어야 합니다." })
  travelTime: number;
}

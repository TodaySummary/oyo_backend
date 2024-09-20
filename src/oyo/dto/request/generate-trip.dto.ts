import { IsNotEmpty } from 'class-validator';

export class GenerateTripDto {
  @IsNotEmpty()
  area: string;
  
  @IsNotEmpty()
  places: string;

  @IsNotEmpty()
  travelTime: number;
}

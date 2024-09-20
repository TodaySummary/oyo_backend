import { Body, Controller, Get } from '@nestjs/common';
import { OyoService } from './oyo.service';
import { GenerateTripDto } from './dto/request/generate-trip.dto';

@Controller('oyo')
export class OyoController {
  constructor(private oyoService: OyoService) {}

  @Get()
  generateTripPlan(@Body() generateTripDto: GenerateTripDto) {
    return this.oyoService.generateTripPlan(generateTripDto);
  }
}

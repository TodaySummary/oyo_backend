import { Body, Controller, Get, Header } from '@nestjs/common';
import { OyoService } from './oyo.service';
import { GenerateTripDto } from './dto/request/generate-trip.dto';

@Controller('oyo')
export class OyoController {
  constructor(private oyoService: OyoService) {}

  @Get()
  generateTripPlan(@Body() generateTripDto: GenerateTripDto) {
    return this.oyoService.generateTripPlan(generateTripDto);
  }

  @Get('/excel')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  generateTripExcel(@Body() generateTripDto: GenerateTripDto) {
    return this.oyoService.generateTripExcel(generateTripDto);
  }
}

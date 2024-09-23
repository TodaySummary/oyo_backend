import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { OyoService } from './oyo.service';
import { GenerateTripDto } from './dto/request/generate-trip.dto';
import { Response } from 'express';

@Controller('oyo')
export class OyoController {
  constructor(private oyoService: OyoService) {}

  @Get()
  generateTripPlan(@Body() generateTripDto: GenerateTripDto) {
    return this.oyoService.generateTripPlan(generateTripDto);
  }

  @Post('/excel')
  generateTripExcel(@Body() generateTripDto: GenerateTripDto, @Res() res: Response) {
    return this.oyoService.generateTripExcel(generateTripDto, res);
  }
}

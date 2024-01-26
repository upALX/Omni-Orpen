import { Controller, Get } from '@nestjs/common';
import { WeatherController } from './weather.controller';

@Controller('/weather')
export class WeatherResource {
  constructor(private weatherController: WeatherController) {}

  @Get('/hello')
  getHello(): string {
    return JSON.stringify(this.weatherController.getHello());
  }
}

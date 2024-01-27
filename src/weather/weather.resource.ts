import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { QueryValidationParamsDTO } from './dto/queryValidationParams.dto';

@Controller('/weather')
export class WeatherResource {
  constructor(private weatherController: WeatherController) {}

  @Get('/hello')
  getHello(): string {
    return JSON.stringify(this.weatherController.getHello());
  }

  //TODO verify why the params are not in the rules
  @Get('/data')
  public async getWeatherData(@Query(new ValidationPipe({transform: true}))params: QueryValidationParamsDTO){

    const weatherResponseDTO = await this.weatherController.getAllDataWeather(
      params.country, params.city
    )

    return JSON.stringify(weatherResponseDTO)
  }
}

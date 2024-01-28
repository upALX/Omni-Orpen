import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { QueryValidationParamsDTO } from './dto/queryValidationParams.dto';
import { WeatherWebhookRegistryDTO } from './dto/weatherWebhookRegistry.dto';

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

  @Get('/history')
  public async getHistoryRequests(){
    const weatherResponseDTO = await this.weatherController.getAllDataWeatherRequest()

    return JSON.stringify(weatherResponseDTO)
  }

  @Post('/registry/webhooks')
  public async postRegistryWebhooks(@Body() req: WeatherWebhookRegistryDTO){

    const {city, country, webhookURL} = req;

    const weatherWebhookDTO = await this.weatherController.registryWeatherWebhook(city, country, webhookURL)

    return JSON.stringify(weatherWebhookDTO)

  }
}

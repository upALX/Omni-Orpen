import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { WeatherController } from './controller/weather.controller';
import { weatherValidationParamsDTO } from './dto/weatherValidationParams';
import { WebhookRegistryRequestDTO } from './dto/webhookRegistryRequest.dto';
import { WebhookController } from './controller/webhook.controller';

@Controller('/weather')
export class WeatherResource {
  constructor(private weatherController: WeatherController, private webhookController: WebhookController) {}

  @Get('/hello')
  getHello(): string {
    return JSON.stringify(this.weatherController.getHello());
  }

  @Get('/data')
  public async getWeatherData(@Query(new ValidationPipe({transform: true}))params: weatherValidationParamsDTO){

    const country = params.country.replace(/[^\w\s]/g, '').toLowerCase().trim();
    const city = params.city.replace(/[^\w\s]/g, '').toLowerCase();

    console.log(country, city)

    const weatherResponseDTO = await this.weatherController.getAllDataWeather(
      country, city
    )

    return JSON.stringify(weatherResponseDTO)
  }

  @Get('/history')
  public async getHistoryRequests(){
    const weatherResponseDTO = await this.weatherController.getAllDataWeatherRequest()

    return JSON.stringify(weatherResponseDTO)
  }

  @Post('/subscribe/webhook')
  public async postRegistryWebhooks(@Body() req: WebhookRegistryRequestDTO){

    const {city, country, webhook_url} = req;

    const weatherWebhookDTO = await this.webhookController.registryWeatherWebhook(city.toLowerCase().trim(), country.toLowerCase().trim(), webhook_url.trim())

    return JSON.stringify(weatherWebhookDTO)
  }
}

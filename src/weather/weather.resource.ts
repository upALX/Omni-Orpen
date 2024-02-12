import { Body, Controller, Delete, Get, Patch, HttpCode, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { WeatherController } from './controller/weather.controller';
import { weatherValidationParamsDTO } from './dto/weatherValidationParams';
import { WebhookRegistryRequestDTO } from './dto/webhookRegistryRequest.dto';
import { WebhookController } from './controller/webhook.controller';
import { IDValidationRequestDTO } from './dto/IDValidationRequest.dto';
import { WebhookValidationBodyDTO } from './dto/webhookValidationBody.dto';

@Controller('/weather')
export class WeatherResource {
  constructor(private weatherController: WeatherController, private webhookController: WebhookController) {}

  @Get('/hello')
  @HttpCode(200)
  getHello(): string {
    return this.weatherController.getHello();
  }
  // replace(/[^\w\s]/g, '').toLowerCase().trim();
  @Get('/data')
  @HttpCode(200)
  public async getWeatherData(@Query(new ValidationPipe({transform: true}))params: weatherValidationParamsDTO){

    const country = params.country.replace(/[^\w\s]/g, '').toLowerCase().trim();
    const city = params.city.replace(/[^\w\sáÁàÀâÂãÃéÉêÊíÍóÓôÔõÕúÚüÜ]/g, '');

    const city_formatted = city.replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/[í]/g, 'i').replace(/[óôõ]/g, 'o').replace(/[ú]/g, 'u').replace(/[ÁÀÂÃ]/g, 'A').replace(/[ÉÊ]/g, 'E').replace(/[Í]/g, 'I').replace(/[ÓÔÕ]/g, 'O').replace(/[Ú]/g, 'U');

    const weatherResponseDTO = await this.weatherController.getAllDataWeather(
      country, city_formatted
    )

    return weatherResponseDTO
  }

  @Get('/history')
  @HttpCode(200)
  public async getHistoryRequests(){
    const weatherResponseDTO = await this.weatherController.getAllDataWeatherRequest()

    return weatherResponseDTO
  }

  @Post('/webhook/subscribe')
  @HttpCode(201)
  public async postRegistryWebhooks(@Body() req: WebhookRegistryRequestDTO){

    const {city, country, webhook_url} = req;

    const weatherWebhookDTO = await this.webhookController.registryWeatherWebhook(city.toLowerCase().trim(), country.toLowerCase().trim(), webhook_url.trim())

    return weatherWebhookDTO
  }

  @Get('/webhooks')
  @HttpCode(200)
  public async getWebhooks(){

    const webhookModelsDTO = await this.webhookController.getAllWebhooks()

    return webhookModelsDTO
  }

  @Patch('/webhook/subscription/:uuid')
  @HttpCode(200)
  public async PathUpdateWebhooksResource(@Param('uuid') uuid: string, @Body() req: WebhookValidationBodyDTO){

    const {city, country, webhook_url} = req;

    const newWeatherWebhookDTO = await this.webhookController.updateWeatherWebhookController(uuid, city.toLowerCase().trim(), country.toLowerCase().trim(), webhook_url.trim());

    return newWeatherWebhookDTO
  }

  @Delete('/webhook/subscription/:webhook_key')
  @HttpCode(204)
  public async deleteWebhookResource(@Param(new ValidationPipe({transform: true})) webhook_key: IDValidationRequestDTO){

    await this.webhookController.deleteWebhookByID(webhook_key.webhook_key)

    return 
  } 
}

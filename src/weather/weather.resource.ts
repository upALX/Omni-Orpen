import { Body, Controller, Delete, Get, Param, Patch, HttpCode, Param, Post, Query, Res, ValidationPipe } from '@nestjs/common';
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
  getHello(): string {
    return this.weatherController.getHello();
  }

  @Get('/data')
  public async getWeatherData(@Query(new ValidationPipe({transform: true}))params: weatherValidationParamsDTO){

    const country = params.country.replace(/[^\w\s]/g, '').toLowerCase().trim();
    const city = params.city.replace(/[^\w\s]/g, '').toLowerCase();

    console.log(country, city)

    const weatherResponseDTO = await this.weatherController.getAllDataWeather(
      country, city
    )

    return weatherResponseDTO
  }

  @Get('/history')
  public async getHistoryRequests(){
    const weatherResponseDTO = await this.weatherController.getAllDataWeatherRequest()

    return weatherResponseDTO
  }

  @Post('/subscribe/webhook')
  public async postRegistryWebhooks(@Body() req: WebhookRegistryRequestDTO){

    const {city, country, webhook_url} = req;

    const weatherWebhookDTO = await this.webhookController.registryWeatherWebhook(city.toLowerCase().trim(), country.toLowerCase().trim(), webhook_url.trim())

    return weatherWebhookDTO
  }

  @Delete('/subscribe/webhook/:webhook_key')
  @HttpCode(204)
  public async deleteWebhookResource(@Param(new ValidationPipe({transform: true})) webhook_key: IDValidationRequestDTO, @Res() res: Response){
    console.log(typeof webhook_key.webhook_key)

    await this.webhookController.deleteWebhookByID(webhook_key.webhook_key)

    return res
  } 

  @Get('/webhooks')
  public async getWebhooks(){

    const webhookModelsDTO = await this.webhookController.getAllWebhooks()

    return webhookModelsDTO
  }
  @Patch('/subscription/webhook/:uuid')
  public async PathUpdateWebhooksResource(@Param('uuid') uuid: string, @Body() req: WebhookValidationBodyDTO){

    console.log(uuid)

    const {city, country, webhook_url} = req;

    const newWeatherWebhookDTO = await this.webhookController.updateWeatherWebhookController(uuid, city.toLowerCase().trim(), country.toLowerCase().trim(), webhook_url.trim());

    return newWeatherWebhookDTO
  }
}

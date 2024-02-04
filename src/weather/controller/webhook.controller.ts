import { WebhookRepository } from "../repository/webhook.repository";
import { WebhookRegistryResponseDTO } from '../dto/webhookRegistryResponse.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { WeatherModel } from "../model/weather.model";
import { WebhookModel } from "../model/webhook.model";
import { WeatherWebhookRequestDTO } from "../dto/weatherWebhookRequest.dto";

@Injectable()
export class WebhookController{
    constructor(
        private webhookRepository: WebhookRepository
    ){}

    public async registryWeatherWebhook(city: string, country: string, webhookURL: string){
        const webhookListModel = await this.webhookRepository.findWebhookModelByGenerics(
          city, country, webhookURL
        )

        if( webhookListModel.length > 0){
          throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `On database already exists a subscription with the url ${webhookURL} and ${city} + ${country}.`,
        }, HttpStatus.BAD_REQUEST);
        }

        const weatherWebhookModel = await this.webhookRepository.saveWeatherWebhook(city, country, webhookURL)
    
        const weatherWebhookDTO = new WebhookRegistryResponseDTO(
          weatherWebhookModel.webhookKey, 
          weatherWebhookModel.webhookURL
        )
        
        return weatherWebhookDTO
      }

      public async deleteWebhookByID(webhook_key: string) {

        const webhookModel = await this.webhookRepository.findWebhookModelByID(webhook_key)
        
        if(webhookModel == null){
          throw new NotFoundException('The webhook_key ${webhook_key} was not found. Verify if is the right webhook_key.');
        }

        await this.webhookRepository.deleteWebhookByID(webhookModel.id)

        return 
      }

      public async getRequestSubscriptionsWebhook(country: string, city: string) {
        
        const arraySubscriptionsWebhookModels = await this.webhookRepository.findAllSubscriptionsWebhookByParams(
          country, city
        ) 

        console.log(`Webhook models found are: ${arraySubscriptionsWebhookModels}`)

        return arraySubscriptionsWebhookModels
      }

      public async sentWebhooks(webhookModels: Array<WebhookModel>, weatherModel: WeatherModel){
          let requestDTO = new WeatherWebhookRequestDTO(
            weatherModel.weather_key,
            weatherModel.createdAt,
            weatherModel.weatherData
          )

          let urlsWebhookArray = webhookModels.map(
            (webhookModel) => {
              return webhookModel.webhookURL
            }
          );

          console.log(`The URLs caught to send are: ${urlsWebhookArray}`)

          for( let url of urlsWebhookArray){
            try{
              const response = await fetch(
                url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestDTO)
                });

                if (!response.ok){
                  throw new Error(`On send webhook to ${url} occurred an error with the status: ${response.status}`);
                }
            }catch(errorCaught){
              console.error(`
                ERROR: ${errorCaught.message}
                STACK: ${errorCaught.stack}
              `);
            }
          } 
      }
}
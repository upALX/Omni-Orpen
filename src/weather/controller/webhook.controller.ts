import { WebhookRepository } from "../repository/webhook.repository";
import { WebhookRegistryResponseDTO } from '../dto/webhookRegistryResponse.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WeatherModel } from "../model/weather.model";
import { WebhookModel } from "../model/webhook.model";
import { WeatherWebhookRequestDTO } from "../dto/weatherWebhookRequest.dto";
import { WebhooksHistoryResponseDTO } from "../dto/webhooksHistoryResponse.dto";

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

      public async getAllWebhooks(): Promise<WebhooksHistoryResponseDTO[]>{

        const webhookModels = await this.webhookRepository.getAllWebhooks()
        
        const webhookModelsDTO = await webhookModels.map(
          (webhookModel) => new WebhooksHistoryResponseDTO(
              webhookModel.webhookKey,
              webhookModel.country,
              webhookModel.city,
              webhookModel.webhookURL
            )
        )

        return webhookModelsDTO
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
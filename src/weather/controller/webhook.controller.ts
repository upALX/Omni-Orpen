import { WebhookRepository } from "../repository/webhook.repository";
import { WebhookResponseDTO } from '../dto/webhookResponse.dto';
import { Injectable } from "@nestjs/common";
import { WeatherModel } from "../model/weather.model";
import { WebhookModel } from "../model/webhook.model";
import { HistoryWeatherResponseDTO } from "../dto/historyWeatherResponse.dto";
import { WeatherRequestDTO } from "../dto/weatherRequest.dto";

@Injectable()
export class WebhookController{
    constructor(
        private webhookRepository: WebhookRepository
    ){}

    public async registryWeatherWebhook(city: string, country: string, webhookURL: string){
        const weatherWebhookModel = await this.webhookRepository.saveWeatherWebhook(city, country, webhookURL)
    
        const weatherWebhookDTO = new WebhookResponseDTO(
          weatherWebhookModel.webhook_key, 
          weatherWebhookModel.webhookURL
        )
        
        return weatherWebhookDTO
      }

      public async getRequestSubscriptionsWebhook(country: string, city: string) {
        
        const subscriptionsWebhookModels = await this.webhookRepository.findAllSubscriptionsWebhookByParams(
          country, city
        ) 

        console.log(`Webhook models finded are: ${subscriptionsWebhookModels}`)

        return subscriptionsWebhookModels

      }

      public async sentWebhooks(webhookModels: Array<WebhookModel>, weatherModel: WeatherModel){
          let requestDTO = new WeatherRequestDTO(
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
import { WebhookRepository } from "../repository/webhook.repository";
import { WebhookRegistryResponseDTO } from '../dto/webhookRegistryResponse.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WeatherModel } from "../model/weather.model";
import { WebhookModel } from "../model/webhook.model";
import { WeatherWebhookRequestDTO } from "../dto/weatherWebhookRequest.dto";
import { throwError } from "rxjs";

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

      public async updateWeatherWebhookController(
        webhook_key: string,
        city?: string, 
        country?: string, 
        webhook_url?: string
      ){
        if (webhook_key.length < 36){
          const error = new Error(`The webhook key ${webhook_key} is lower than 36 and probably not exist on database.`);
          (error as any).statusCode = 404; // Set the status code property
          throw error;
        }

        const webhook_model = await this.webhookRepository.findWebhookByKey(
          webhook_key
        );

        if (webhook_model == null){
          const error = new Error(`The webhook ${webhook_key} searched was not found.`);
          (error as any).statusCode = 404; // Set the status code property
          throw error;
        }

        const currentDate: Date = new Date();

        console.log(new Date().toISOString().slice(0, 19));

        webhook_model.city = city;
        webhook_model.country = country;
        webhook_model.webhookURL = webhook_url;
        webhook_model.updatedAt = currentDate.toISOString().slice(0, 19);

        const newWeatherWebhookModel = await this.webhookRepository.updateWeatherWebhookRepository(webhook_key, webhook_model);

        const WeatherModelDTO = new WebhookRegistryResponseDTO(
          newWeatherWebhookModel.webhookKey, 
          newWeatherWebhookModel.webhookURL
        );
        
        return WeatherModelDTO
      }

      public async getRequestSubscriptionsWebhook(country: string, city: string) {
        
        const arraySubscriptionsWebhookModels = await this.webhookRepository.findAllSubscriptionsWebhookByParams(
          country, city
        );

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
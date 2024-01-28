import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebhookModel } from '../model/webhook.model';

@Injectable()
export class WebhookRepository {
  constructor(
    
    @InjectRepository(WebhookModel)
    private readonly webhookRepository: Repository<WebhookModel>,
    private webhookModelDB: WebhookModel
  ) {}

    public async saveWeatherWebhook(city: string, country: string, webhookURL: string){
      this.webhookModelDB.city = city
      this.webhookModelDB.country = country
      this.webhookModelDB.webhookURL = webhookURL

      const model = await this.webhookRepository.save(this.webhookModelDB)

      return model
    }

    public async findAllSubscriptionsWebhookByParams(targetCountry: string, targetCity: string){

      console.log(`ON REPOSITORY TO GET ALL SUBSCRIPTIONS MODELS WEBHOOK where the country is ${targetCountry} and city is ${targetCity}`)
      
      const allSubscriptionsModels = await this.webhookRepository.find(
        {
          where: {
            country: targetCountry,
            city: targetCity
          }
        }
      );

      console.log(`All URLS found on REPOSITORY: ${JSON.stringify(allSubscriptionsModels)}`)

      return allSubscriptionsModels

    }
}

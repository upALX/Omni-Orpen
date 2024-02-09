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

  public async getAllWebhooks(): Promise<WebhookModel[]>{
    const webhookModels = this.webhookRepository.find()

    return webhookModels
  }

    public async saveWeatherWebhook(city: string, country: string, webhookURL: string){

      this.webhookModelDB = new WebhookModel()
      
      this.webhookModelDB.city = city
      this.webhookModelDB.country = country
      this.webhookModelDB.webhookURL = webhookURL

      const model = await this.webhookRepository.save(this.webhookModelDB)

      return model
    }

    public async findWebhookModelByID(webhook_key: string): Promise<WebhookModel | null> {
      const webhook = await this.webhookRepository.findOne({
        where: {
          webhookKey: webhook_key
        }
      }) 

      console.log(`On search by ID the model is  ${webhook}`)

      return webhook
    }

    public async deleteWebhookByID(id: number): Promise<void>{
      console.log(`On DELETE the id IS:  ${id}`)
      this.webhookRepository.delete(id)

      return 
    }

    public async findWebhookModelByGenerics(
      city: string, 
      country: string, 
      webhookURL: string){

        console.log(`This is the city property ${city} and it type is ${typeof city}`)
        const model = await this.webhookRepository.find({
          where: {
            city, 
            country, 
            webhookURL}});

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

    public async findWebhookByKey(webhook_key: string){
      const webhook_model = await this.webhookRepository.findOne(
        {where: {webhookKey: webhook_key}}
      )

      console.log(`The webhook model finded is: ${webhook_model}`)

      return webhook_model
    }

    public async updateWeatherWebhookRepository(id: string, webhook_model: WebhookModel): Promise<WebhookModel>{


      const newWebhookModel = await this.webhookRepository.save(
        webhook_model
      ) 

      return newWebhookModel
    }
}

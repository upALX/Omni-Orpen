import { ConfigService } from "@nestjs/config";
import { WebhookRepository } from "../repository/webhook.repository";
import { WebhookResponseDTO } from '../dto/webhookResponse.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class WebhookController{
    constructor(
        private readonly configService: ConfigService, private webhookRepository: WebhookRepository
    ){}

    public async registryWeatherWebhook(city: string, country: string, webhookURL: string){
        const weatherWebhookModel = await this.webhookRepository.saveWeatherWebhook(city, country, webhookURL)
    
        const weatherWebhookDTO = new WebhookResponseDTO(
          weatherWebhookModel.webhook_key, 
          weatherWebhookModel.webhookURL
        )
        
        return weatherWebhookDTO
      }
}
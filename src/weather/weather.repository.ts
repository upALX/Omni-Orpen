import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherModel } from './model/weather.model';
import { WebhooksModel } from './model/webhooks.model';

@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(WeatherModel)
    private readonly weatherRepository: Repository<WeatherModel>,
    @InjectRepository(WebhooksModel)
    private readonly webhookRepository: Repository<WebhooksModel>,
    private weatherModelDB: WeatherModel,
    private webhookModelDB: WebhooksModel
  ) {}

    public async saveWeatherData(city: string, country: string, weatherData: Object){
      this.weatherModelDB.city = city
      this.weatherModelDB.country = country
      this.weatherModelDB.weatherData = weatherData

      const model = await this.weatherRepository.save(this.weatherModelDB)

      return model
    } 

    public async getAllDataRequests(){
      const model = await this.weatherRepository.find()

      return model
    }

    public async saveWeatherWebhook(city: string, country: string, webhookURL: string){
      this.webhookModelDB.city = city
      this.webhookModelDB.country = country
      this.webhookModelDB.webhookURL = webhookURL

      const model = await this.webhookRepository.save(this.webhookModelDB)

      return model
    }
}

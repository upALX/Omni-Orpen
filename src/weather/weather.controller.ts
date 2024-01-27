import { Injectable } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherController {
  private apiKey = ''

  constructor(private readonly configService: ConfigService, private weatherRepository: WeatherRepository) {
    this.apiKey = this.configService.get<string>('API_KEY')
  }

  public getHello(): string {
    return 'Hello world';
  }

  public getAllDataWeather(country: string, city: string): string{



    return `${country}  ${city}`
  }
}

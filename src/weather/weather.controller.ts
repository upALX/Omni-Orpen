import { Injectable } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';

@Injectable()
export class WeatherController {
  constructor(private weatherRepository: WeatherRepository) {}

  public getHello(): string {
    return 'Hello world';
  }
}

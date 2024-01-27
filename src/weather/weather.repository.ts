import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherModel } from './model/weather.model';


@Injectable()
export class WeatherRepository {
  constructor(
    @InjectRepository(WeatherModel)
    private readonly weatherRepository: Repository<WeatherModel>,
    private weatherModelDB: WeatherModel
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
}

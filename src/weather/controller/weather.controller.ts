import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WeatherRepository } from '../repository/weather.repository';
import { ConfigService } from '@nestjs/config';
import { WeatherDataResponseDTO } from '../dto/weatherDataResponse.dto';
import { WeatherHistoryResponseDTO } from '../dto/weatherHistoryResponse.dto';
import { WebhookController } from './webhook.controller';

@Injectable()
export class WeatherController {
  private apiKey = ''

  constructor(
    private readonly configService: ConfigService, 
    private weatherRepository: WeatherRepository,
    private webhookController: WebhookController
    ) {
    this.apiKey = this.configService.get<string>('API_KEY')
  }

  public getHello(): string {
    return 'Hello world';
  }

  public async getAllDataWeather(country: string, city: string): Promise<Object>{

    const coordinatesDataObject = await this.getCoordinatesByCountryCity(city, country);

    console.log(`The coordinates are: ${coordinatesDataObject}`)

    const weatherData = await this.getWeatherDataByCoordinates(coordinatesDataObject.longitude, coordinatesDataObject.latitude);

    console.log(`The weather DATA are: ${weatherData}`)
    
    const weatherModel = await this.weatherRepository.saveWeatherData(city, country, weatherData);

    const arraySubscriptionsToReceiveWebhook = await this.webhookController.getRequestSubscriptionsWebhook(
      country, city
    );

    if(arraySubscriptionsToReceiveWebhook.length > 0){

      //Send only successful requests because the devs need the information when a location was consulted, not when a request is made
      this.webhookController.sentWebhooks(arraySubscriptionsToReceiveWebhook, weatherModel)
    }

    console.log(`The weather model was saved and has the key: ${weatherModel.weather_key}`)

    const weatherResponseDTO = new WeatherDataResponseDTO(weatherModel.weather_key, weatherModel.weatherData);

    console.log(`The DTO created: ${weatherResponseDTO}`)

    return weatherResponseDTO
  }

  public async getAllDataWeatherRequest(): Promise<Object>{

    const allWeatherData = await this.weatherRepository.getAllDataRequests()

    const allWeatherDataDTO = allWeatherData.map(
      (weatherModel) => new WeatherHistoryResponseDTO(
          weatherModel.city,
          weatherModel.country,
          weatherModel.createdAt,
          weatherModel.weatherData
        ) 
    );

    return allWeatherDataDTO
  }

  private async getWeatherDataByCoordinates(longitude: string, latitude: string): Promise<Object>{
    let weatherByCoordinatesURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;

    try{

      var weatherDataResponse = await fetch(weatherByCoordinatesURL)
      .then(
        (response) => {
          if(!response.ok){

            throw new Error(`Failed to fetch data on DATA BY COORDINATES. Status: ${response.status}`);
          }
          return response.json()
        }
      );

      console.log(`The weather data from coordinates is ${weatherDataResponse}`)

    }catch(errorCaught){
        if (weatherDataResponse.length <= 0){
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: `The weather for CITY and COUNTRY information was not found. Confirm if you are using the country codes ISO 3166`,
          }, HttpStatus.NOT_FOUND,{
              cause: errorCaught
          });
        }else{
          throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: `We found an internal error and we are fixing it.`,
          }, HttpStatus.INTERNAL_SERVER_ERROR,{
              cause: errorCaught
          });
        }
    };

    return weatherDataResponse
  }

  private async getCoordinatesByCountryCity(city: string, country: string){
    
    let geocodingApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${this.apiKey}`

    try{
      var coordinatesDataResponse = await fetch(geocodingApiURL)
      .then(
        (response) => {
          if(!response.ok){
            throw new Error(`Failed to fetch data on GET Coordinates by PARAMS. Status: ${response.status}`);
          }
          return response.json()
        }
      );  

      let locationCoordinates = coordinatesDataResponse[0];

      var coordinates = {
        latitude: locationCoordinates.lat,
        longitude: locationCoordinates.lon,
      }

      console.log(`The captured coordinates are: ${coordinates} `)

    }catch(errorCaught){
      if(coordinatesDataResponse.length <= 0){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `The country ${country} and city ${city} provided do not have information about your location`,
        }, HttpStatus.NOT_FOUND,{
            cause: errorCaught
        });
      }else{
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `We found an internal error and we are fixing it`,
        }, HttpStatus.INTERNAL_SERVER_ERROR,{
            cause: errorCaught
        });
      }
    }
    return coordinates
  }
}

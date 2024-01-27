import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  public async getAllDataWeather(country: string, city: string): Promise<Object>{


    //get cordinate by location
    const coordinatesDataByLocationName = await this.getCoordinatesByCountryCity(city, country)

    //get all weather data by cordinate

    console.log(coordinatesDataByLocationName)
    
    //save the data on database
    
    
    //return the data
    return coordinatesDataByLocationName
  }

  private async getCoordinatesByCountryCity(city: string, country: string): Promise<Object>{
    
    let geocodingApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${this.apiKey}`

    try{
      var coordinatesDataResponse = await fetch(geocodingApiURL)
      .then(
        (response) => {
          if(!response.ok){
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
          return response.json()
        }
      );  

      let locationCoordinates = coordinatesDataResponse[0];

      var coordinates = {
        latitude: locationCoordinates.lat,
        longitude: locationCoordinates.lon,
      };

      console.log(`The coordinates getted are: ${coordinates} `)

    }catch(errorCaught){
      if (coordinatesDataResponse.status == 404){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `The result with this parameters was not found`,
        }, HttpStatus.NOT_FOUND,{
            cause: errorCaught
        });
      }else if(coordinatesDataResponse.length <= 0){
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `The country ${country} and ${city} provided do not have information about your location`,
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

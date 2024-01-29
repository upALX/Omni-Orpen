export class WeatherDataResponseDTO{
    constructor(
        readonly weather_key: string, 
        readonly weather_data: Object){
    }
}
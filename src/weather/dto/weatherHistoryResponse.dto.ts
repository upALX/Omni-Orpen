export class WeatherHistoryResponseDTO{
    constructor(
        readonly city: string,
        readonly country: string, 
        readonly request_date: string, 
        readonly weather_data: Object){
    }
}
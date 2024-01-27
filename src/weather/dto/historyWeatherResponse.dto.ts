export class HistoryWeatherResponseDTO{
    constructor(
        readonly city: string,
        readonly country: string, 
        readonly requestDate: string, 
        readonly weatherData: Object){
    }
}
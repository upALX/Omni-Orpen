export class HistoryWeatherResponseDTO{
    constructor(
        readonly city: string,
        readonly country: string, 
        readonly requestDate: Date, 
        readonly weatherData: Object){
    }
}
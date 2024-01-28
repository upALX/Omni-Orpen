export class WeatherRequestDTO{
    constructor(
        readonly request_key: string,
        readonly request_datetime: string, 
        readonly request_data: Object
    ){}
}
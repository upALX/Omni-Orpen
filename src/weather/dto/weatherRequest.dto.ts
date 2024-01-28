export class WeatherRequestDTO{
    constructor(
        readonly status_request: string,
        readonly request_datetime: string, 
        readonly request_data: Object
    ){}
}
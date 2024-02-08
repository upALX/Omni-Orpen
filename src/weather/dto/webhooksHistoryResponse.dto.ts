export class WebhooksHistoryResponseDTO{
    constructor(
        readonly webhook_key: string,
        readonly country_code: string,
        readonly city: string,
        readonly webhook_url: string,
    ){}
}
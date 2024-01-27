export class WebhookResponseDTO{
    constructor(
        readonly webhook_key: string,
        readonly webhook_url: string
    ){}
}
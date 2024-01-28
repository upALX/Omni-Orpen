export class WebhookRegistryResponseDTO{
    constructor(
        readonly webhook_key: string,
        readonly webhook_url: string
    ){}
}
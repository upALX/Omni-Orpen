import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class WebhookRegistryRequestDTO{

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    webhook_url: string;
}
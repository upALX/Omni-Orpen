import { IsNotEmpty, IsString } from "class-validator";

export class WebhookRegistryRequestDTO{

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    webhookURL: string;
}
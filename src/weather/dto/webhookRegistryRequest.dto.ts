import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class WebhookRegistryRequestDTO{

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    country: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    webhook_url: string;
}
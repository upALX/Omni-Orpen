import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class WebhookRegistryRequestDTO{

    @IsString()
    @Length(1,85)
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(8,700)
    @IsUrl()
    webhook_url: string;
}
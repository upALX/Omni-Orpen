import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class WebhookValidationBodyDTO{

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    @Length(2, 2)
    country: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    webhook_url: string;
}
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class WebhookValidationParamsDTO{

    @IsString()
    @IsNotEmpty()
    @Length(36)
    id: string;
}
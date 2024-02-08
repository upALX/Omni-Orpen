import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";
import { UUID } from "crypto";

export class IDValidationRequestDTO{

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @Length(36,36)
    webhook_key: string;
}
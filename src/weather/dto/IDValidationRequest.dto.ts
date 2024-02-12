import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class IDValidationRequestDTO{

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    @Length(36,36)
    webhook_key: string;
}
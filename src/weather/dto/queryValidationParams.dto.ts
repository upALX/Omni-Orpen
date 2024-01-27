import { IsNotEmpty, IsString } from "class-validator";


export class QueryValidationParamsDTO{

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;
}
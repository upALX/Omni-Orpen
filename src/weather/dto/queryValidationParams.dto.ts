import { IsNotEmpty, IsString, Length } from "class-validator";


export class QueryValidationParamsDTO{

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    country: string;

    @IsString()
    @IsNotEmpty()
    city: string;
}

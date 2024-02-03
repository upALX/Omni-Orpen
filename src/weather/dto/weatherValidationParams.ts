import { IsNotEmpty, IsString, Length } from "class-validator";


export class weatherValidationParamsDTO{

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    country: string;

    @IsString()
    @IsNotEmpty()
    @Length(1,85)
    city: string;
}

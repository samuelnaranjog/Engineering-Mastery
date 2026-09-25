import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateApiKeyDto {
    @IsString()
    @IsNotEmpty()
    owner: string

    @IsInt()
    @IsPositive()
    quota: number
}

import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export classCreateApiKeyDto {
    @IsString()
    @IsNotEmpty()
    owner: string

    @IsInt()
    @IsPositive()
    quota: number
}

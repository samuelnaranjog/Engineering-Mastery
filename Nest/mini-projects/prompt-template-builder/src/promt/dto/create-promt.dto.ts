import { IsInt, IsString, Matches, IsArray, IsDate } from 'class-validator';

const TEMPLATE_REGEX = /\{\{\w+\}\}/

export  class CreatePromtDto {
    @IsString()
    title: string

    @Matches(TEMPLATE_REGEX)
    template: string

    @IsArray()
    tags: string[]
}

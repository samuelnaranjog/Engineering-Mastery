import {IsObject } from "class-validator";


export class compilePromtDto {
    @IsObject()
    variables: Object
}
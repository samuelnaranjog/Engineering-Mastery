import type {CreateCard} from '@project/shared-types'
import { IsNotEmpty, IsString, MaxLength, IsNumber} from 'class-validator';

export class CreateCardDto implements CreateCard {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    front: string;

    @IsString()
    @IsNotEmpty()
    back: string;

    @IsString()
    @IsNotEmpty()
    deck: string;
}
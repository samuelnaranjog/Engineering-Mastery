import type {CreateCard} from '@project/shared-types'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCardDto implements CreateCard {
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
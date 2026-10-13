import { Injectable } from '@nestjs/common';
import { CalculateDto } from './dto/addition.dto.js';
import { CalculateResult } from '@project/shared-types';

@Injectable()
export class CardsService {
    retrieveCard(payload: CalculateDto): CalculateResult{
        console.log("Received payload: ", payload)
        const result = payload.n1 + payload.n2 
        return {result: result}
    }
}

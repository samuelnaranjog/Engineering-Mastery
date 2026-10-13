import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardsService } from './cards.service.js';
import { CalculateDto } from './dto/addition.dto.js';
import type { CalculateResult } from '@project/shared-types';
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  retrieveCard(@Body() payload: CalculateDto): CalculateResult {
    return this.cardsService.retrieveCard(payload)
  }
}

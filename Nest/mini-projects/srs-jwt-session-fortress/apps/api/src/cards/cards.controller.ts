import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { CardsService } from './cards.service.js';
import { CalculateDto } from './dto/addition.dto.js';
import { CreateCardDto } from './dto/create-card.dto.js';
import { ReviewCardDto } from './dto/review-card.dto.js';
import type { CalculateResult, CardInboxItem, ReviewCard } from '@project/shared-types';

// Guards 
import HmacGuard from '../common/guards/Hmac.guard.js';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}


  @Post()
  retrieveCard(@Body() payload: CalculateDto): CalculateResult {
    return this.cardsService.retrieveCard(payload)
  }

  @UseGuards(HmacGuard)
  @Post('/webhooks/n8n/cards')
  newCard(@Body() createCardDto: CreateCardDto): CardInboxItem {
    console.log("NEW_CARD: Trying to create a new card")
    return this.cardsService.newCard(createCardDto);
  }

  @Get('inbox') // or @Get() depending on your base route
  getCardsPending(): CardInboxItem[] {

    console.log("Received Request")
    return this.cardsService.getCardsPending();
  }

  @Post(':id/decision')
  updateStatus(@Param('id') id: number, @Body() reviewCardDto: ReviewCardDto){
    console.log("Received state change:", reviewCardDto)
    return this.cardsService.updateStatus(id, reviewCardDto)
  }
}

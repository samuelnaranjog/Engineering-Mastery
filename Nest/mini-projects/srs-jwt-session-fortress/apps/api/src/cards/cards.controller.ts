import { Controller, Get, Post,Put, Body, UseGuards, Param } from '@nestjs/common';
import { CardsService } from './cards.service.js';
import { CalculateDto } from './dto/addition.dto.js';
import { CreateCardDto } from './dto/create-card.dto.js';
import { ReviewCardDto } from './dto/review-card.dto.js';
import { TriggerGenerationDto } from './dto/card-creation-request.dto.js';
import { UpdateCardSchedulerDto } from './dto/update-card-scheduler.dto.js';
import type { CalculateResult, CardInboxItem, ReviewCard } from '@project/shared-types';

// Guards 
import HmacGuard from '../common/guards/Hmac.guard.js';
import { AuthGuard } from '../auth/guards/access.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}


  @Post()
  async retrieveCard(@Body() payload: CalculateDto): Promise<CalculateResult> {
    return await this.cardsService.retrieveCard(payload)
  }

  // Card generation Request handling

  // Front end generation trigger
  @UseGuards(AuthGuard)
  @Post('/webhooks/n8n/generate-card')
  triggerCardGeneration(@CurrentUser('id') id: number , @Body() triggerGenerationDto: TriggerGenerationDto){
    console.log('Trying to trigger AI card creation')
    return this.cardsService.triggerCardGenerationN8n(id, triggerGenerationDto)
  }

  @UseGuards(HmacGuard)
  @Post('/webhooks/n8n/cards')
  async newCard( @Body() createCardDto: CreateCardDto): Promise<CardInboxItem> {
    console.log("NEW_CARD: Trying to create a new card")
    return this.cardsService.newCard( createCardDto);
  }

  @Get('inbox') // or @Get() depending on your base route
  @UseGuards(AuthGuard)
  getCardsPending(@CurrentUser('id') id: number ): CardInboxItem[] {

    console.log("Received Request")
    return this.cardsService.getCardsPending(id);
  }

  @Post(':id/decision')
  updateStatus(@Param('id') id: number, @CurrentUser('id') userId: number,  @Body() reviewCardDto: ReviewCardDto){
    console.log("Received state change:", reviewCardDto)
    return this.cardsService.updateStatus(id,userId, reviewCardDto)
  }


  // CARDS DATA EXTRACTION
  @Get('review-today')
  @UseGuards(AuthGuard)
  findTodayReviewCount(@CurrentUser('id') id: number ){
    return this.cardsService.findTodayReviewCount(id)
  }

  @Get('review-today-data')
  @UseGuards(AuthGuard)
  findTodayReviewTodayCards(@CurrentUser('id') id: number ){
    return this.cardsService.findTodayReviewTodayCards(id)
  }

  @Put('update-card-status')
  @UseGuards(AuthGuard)
  updateReviewedCardData(@CurrentUser('id') id: number, @Body() updateCardSchedulerDto: UpdateCardSchedulerDto ){
    console.log('Received request for updatescheduler:' , updateCardSchedulerDto)
    return this.cardsService.updateReviewedCardData(id, updateCardSchedulerDto)
  }

}



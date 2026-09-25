import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ContentService } from './content.service.js';
import { CreateContentDto } from './dto/create-content.dto.js';
import { UpdateContentDto } from './dto/update-content.dto.js';
import { ApiKeyGuard } from '../auth/guards/api-key/api-key.guard.js';
import { LoggingInterceptor } from '../audit/interceptors/logging.interceptor.js';
import { ApiKeyOwner } from '../auth/decorators/api-key-owner.decorator.js';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('articles/overview')
  findAll() {
    return this.contentService.findAll();
  }

  @UseInterceptors(LoggingInterceptor)
  @UseGuards(ApiKeyGuard)
  @Get('articles')
  getArticles(@ApiKeyOwner() owner : string){
    return this.contentService.findByOwner(owner)
  }





}

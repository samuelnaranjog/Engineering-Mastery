import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseArrayPipe } from '@nestjs/common';
import { PromtService } from './promt.service.js';
import { CreatePromtDto } from './dto/create-promt.dto.js';
import { UpdatePromtDto } from './dto/update-promt.dto.js';
import type { Promt } from './entities/promt.entity.js';

@Controller('promts')
export class PromtController {
  constructor(private readonly promtService: PromtService) {}

  @Post()
  create(@Body() createPromtDto: CreatePromtDto): Promt {
    return this.promtService.create(createPromtDto);
  }

  @Get()
  findAll(
    @Query('tags', new ParseArrayPipe({ items: String, separator: ',', optional: true }))
    tags?: string[],
  ) {
    return this.promtService.findAll(tags);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromtDto: UpdatePromtDto) {
    return this.promtService.update(+id, updatePromtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promtService.remove(+id);
  }
}

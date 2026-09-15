import { Injectable } from '@nestjs/common';
import { CreatePromtDto } from './dto/create-promt.dto.js';
import { UpdatePromtDto } from './dto/update-promt.dto.js';
import { Promt } from './entities/promt.entity.js';

@Injectable()
export class PromtService {
  promt: Promt[] = []
  id = 0
  
  create(createPromtDto: CreatePromtDto): Promt {
    this.id++
    const currentDate = new Date();

    const newPrompt = {
      ...createPromtDto,
      id: this.id,
      createdAt: currentDate,
      updatedAt: currentDate
    }

    console.log('Adding new promt: ', newPrompt)
    this.promt.push(newPrompt)
    return newPrompt;
  }

  findAll(tags?: string[]): Promt[] {

    if (!tags || tags.length === 0) {
    return this.promt;
  }

    return this.promt.filter(promtObj =>
      promtObj.tags.some(tag => tags.includes(tag))
    );

  }

  findOne(id: number) {
    return `This action returns a #${id} promt`;
  }

  update(id: number, updatePromtDto: UpdatePromtDto) {
    return `This action updates a #${id} promt`;
  }

  remove(id: number) {
    return `This action removes a #${id} promt`;
  }
}

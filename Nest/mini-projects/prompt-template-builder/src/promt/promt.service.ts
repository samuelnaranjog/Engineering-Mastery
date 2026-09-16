import { Injectable, NotFoundException} from '@nestjs/common';
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

  findOne(id: number): Promt {
    const foundObj = this.promt.find(prompt => prompt.id === id)

    if(foundObj){
      return foundObj
    }
    throw new NotFoundException(`The prompt with id: ${id} couldn't be found`)
    
  }

  compilePrompt(id: number, variables: Record<string,string>){
    // Pattern to match {{key}} and capture "key" inside group 1
    const variableExtractor = /\{\{\s*(\w+)\s*\}\}/g;

    const prompt = this.findOne(id);
    const template = prompt.template

    // Extract unique variable names as string[]
    const requiredVars = [
      ...new Set([...template.matchAll(variableExtractor)].map(m => m[1]))
    ];

    console.log('Extracted Variables:', requiredVars)
    console.log('Extracted Variables:', variables)

    template.replace(variableExtractor, (match, key) => {
    // If the variable was supplied, substitute it; otherwise keep or throw
    if (key in variables) {
      return variables[key];
    })
    
  }

  update(id: number, updatePromtDto: UpdatePromtDto) {
    return `This action updates a #${id} promt`;
  }

  remove(id: number) {
    return `This action removes a #${id} promt`;
  }
}

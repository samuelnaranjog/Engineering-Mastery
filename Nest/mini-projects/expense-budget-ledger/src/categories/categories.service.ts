import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import {DRIZZLE} from '../database/database.tokens.js'
import { categories } from '../database/schema/users.schema.js';
import type { DrizzleDBSchema } from '../database/database.module.js';
import { Category, NewCategory } from '../database/schema/users.schema.js';
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDBSchema,
  ) {}  
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory : NewCategory = {
      ...createCategoryDto
    }
      
    return this.db.insert(categories).values(newCategory).returning().get();
  }

  findAll() {
    return  this.db.select().from(categories).all();;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

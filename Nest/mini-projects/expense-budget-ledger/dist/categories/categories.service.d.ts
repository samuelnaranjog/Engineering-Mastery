import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import type { DrizzleDBSchema } from '../database/database.module.js';
export declare class CategoriesService {
    private readonly db;
    constructor(db: DrizzleDBSchema);
    create(createCategoryDto: CreateCategoryDto): {
        name: string;
        budget: number;
        id: number;
        createdAt: string | null;
    };
    findAll(): {
        id: number;
        name: string;
        budget: number;
        createdAt: string | null;
    }[];
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}

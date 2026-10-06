import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: string): string;
}

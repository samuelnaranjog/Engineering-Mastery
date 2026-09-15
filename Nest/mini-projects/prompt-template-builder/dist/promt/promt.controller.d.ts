import { PromtService } from './promt.service.js';
import { CreatePromtDto } from './dto/create-promt.dto.js';
import { UpdatePromtDto } from './dto/update-promt.dto.js';
import type { Promt } from './entities/promt.entity.js';
export declare class PromtController {
    private readonly promtService;
    constructor(promtService: PromtService);
    create(createPromtDto: CreatePromtDto): Promt;
    findAll(tags?: string[]): Promt[];
    findOne(id: string): string;
    update(id: string, updatePromtDto: UpdatePromtDto): string;
    remove(id: string): string;
}

import { CreatePromtDto } from './dto/create-promt.dto.js';
import { UpdatePromtDto } from './dto/update-promt.dto.js';
import { Promt } from './entities/promt.entity.js';
export declare class PromtService {
    promt: Promt[];
    id: number;
    create(createPromtDto: CreatePromtDto): Promt;
    findAll(tags?: string[]): Promt[];
    findOne(id: number): Promt;
    compilePrompt(id: number, variables: Record<string, string>): void;
    update(id: number, updatePromtDto: UpdatePromtDto): string;
    remove(id: number): string;
}

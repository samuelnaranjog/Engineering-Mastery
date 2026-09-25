import { Article } from './entities/articles.entity.js';
export declare class ContentService {
    private articles;
    findAll(): Article[];
    findByOwner(owner: string): Article[];
}

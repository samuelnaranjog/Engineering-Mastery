import { ContentService } from './content.service.js';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    findAll(): import("./entities/articles.entity.js").Article[];
    getArticles(owner: string): import("./entities/articles.entity.js").Article[];
}

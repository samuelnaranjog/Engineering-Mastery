var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { initialArticles } from './entities/articles.entity.js';
let ContentService = class ContentService {
    articles = [...initialArticles];
    findAll() {
        return this.articles;
    }
    findByOwner(owner) {
        const ownerArticles = this.articles.filter(article => article.owner == owner);
        return ownerArticles;
    }
};
ContentService = __decorate([
    Injectable()
], ContentService);
export { ContentService };
//# sourceMappingURL=content.service.js.map
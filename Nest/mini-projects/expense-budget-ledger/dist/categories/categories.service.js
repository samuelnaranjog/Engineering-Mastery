var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../database/database.tokens.js';
import { categories } from '../database/schema/users.schema.js';
let CategoriesService = class CategoriesService {
    db;
    constructor(db) {
        this.db = db;
    }
    create(createCategoryDto) {
        const newCategory = {
            ...createCategoryDto
        };
        return this.db.insert(categories).values(newCategory).returning().get();
    }
    findAll() {
        return this.db.select().from(categories).all();
        ;
    }
    findOne(id) {
        return `This action returns a #${id} category`;
    }
    update(id, updateCategoryDto) {
        return `This action updates a #${id} category`;
    }
    remove(id) {
        return `This action removes a #${id} category`;
    }
};
CategoriesService = __decorate([
    Injectable(),
    __param(0, Inject(DRIZZLE)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
export { CategoriesService };
//# sourceMappingURL=categories.service.js.map
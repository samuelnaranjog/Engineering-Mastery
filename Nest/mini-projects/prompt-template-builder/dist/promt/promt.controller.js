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
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseArrayPipe } from '@nestjs/common';
import { PromtService } from './promt.service.js';
import { CreatePromtDto } from './dto/create-promt.dto.js';
import { UpdatePromtDto } from './dto/update-promt.dto.js';
let PromtController = class PromtController {
    promtService;
    constructor(promtService) {
        this.promtService = promtService;
    }
    create(createPromtDto) {
        return this.promtService.create(createPromtDto);
    }
    findAll(tags) {
        return this.promtService.findAll(tags);
    }
    findOne(id) {
        return this.promtService.findOne(+id);
    }
    update(id, updatePromtDto) {
        return this.promtService.update(+id, updatePromtDto);
    }
    remove(id) {
        return this.promtService.remove(+id);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePromtDto]),
    __metadata("design:returntype", Object)
], PromtController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('tags', new ParseArrayPipe({ items: String, separator: ',', optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PromtController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromtController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdatePromtDto]),
    __metadata("design:returntype", void 0)
], PromtController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromtController.prototype, "remove", null);
PromtController = __decorate([
    Controller('promts'),
    __metadata("design:paramtypes", [PromtService])
], PromtController);
export { PromtController };
//# sourceMappingURL=promt.controller.js.map
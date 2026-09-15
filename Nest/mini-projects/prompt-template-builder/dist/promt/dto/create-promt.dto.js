var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, Matches, IsArray } from 'class-validator';
const TEMPLATE_REGEX = /\{\{\w+\}\}/;
export class CreatePromtDto {
    title;
    template;
    tags;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], CreatePromtDto.prototype, "title", void 0);
__decorate([
    Matches(TEMPLATE_REGEX),
    __metadata("design:type", String)
], CreatePromtDto.prototype, "template", void 0);
__decorate([
    IsArray(),
    __metadata("design:type", Array)
], CreatePromtDto.prototype, "tags", void 0);
//# sourceMappingURL=create-promt.dto.js.map
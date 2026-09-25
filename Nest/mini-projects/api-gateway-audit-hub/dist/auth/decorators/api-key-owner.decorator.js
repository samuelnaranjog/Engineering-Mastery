import { createParamDecorator } from '@nestjs/common';
export const ApiKeyOwner = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.apiKeyOwner;
});
//# sourceMappingURL=api-key-owner.decorator.js.map
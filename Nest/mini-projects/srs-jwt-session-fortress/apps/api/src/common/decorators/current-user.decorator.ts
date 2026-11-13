// src/common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
  id: number;
  sub: number;
  exp: number;
  email?: string;
  [key: string]: any;
}

export const CurrentUser = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request['user'] as AuthenticatedUser | undefined;

    // If a specific property is requested (e.g. @CurrentUser('id')), return just that
    return data ? user?.[data] : user;
  },
);
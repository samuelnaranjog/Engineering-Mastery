import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as crypto from 'node:crypto';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';

interface RawBodyRequest extends Request {
  rawBody?: Buffer;
}


@Injectable()
export default class HmacGuard implements CanActivate{
     private readonly secret: string
     
     constructor(private readonly configService: ConfigService) {
          const secret = this.configService.get<string>('WEBHOOK_SECRET');
          if (!secret) {
            throw new Error('WEBHOOK_SECRET is not defined in environment variables');
          }
          this.secret = secret;
     }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<RawBodyRequest>() 
        const signature = req.headers['x-signature'] as string | undefined;
        const timestampStr = req.headers['x-timestamp'] as string | undefined;

        if (!signature || !timestampStr || !req.rawBody) {
             throw new UnauthorizedException('Missing HMAC authentication headers or body');
        }

        const timestamp = parseInt(timestampStr, 10);
        const now = Math.floor(Date.now() / 1000);

        // 1. Replay prevention: reject timestamps older than 5 minutes or in the future
        if (Math.abs(now - timestamp) > 300) {
             throw new UnauthorizedException('Webhook timestamp outside allowed tolerance');
        }

        // 2. Reconstruct the exact string that n8n signed
        const stringToSign = `${timestampStr}.${req.rawBody.toString('utf-8')}`;
        const expectedSignature = crypto
        .createHmac('sha256', this.secret)
        .update(stringToSign)
        .digest('hex');

        // 3. Timing-safe comparison to prevent side-channel timing attacks
          const sigBuffer = Buffer.from(signature, 'hex');
          const expectedBuffer = Buffer.from(expectedSignature, 'hex');

          if (
               sigBuffer.length !== expectedBuffer.length ||
               !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
          ) {
               throw new UnauthorizedException('Invalid HMAC signature');
          }

          return true;
          }
}
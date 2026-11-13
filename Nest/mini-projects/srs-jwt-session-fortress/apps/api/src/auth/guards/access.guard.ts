import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';
@Injectable()
export class AuthGuard implements CanActivate {
  accessSecret: string;
  constructor(private readonly configService: ConfigService) {
    const accessSecret = this.configService.get<string>('ACCESS_TOKEN_SECRET'); 
    if (!accessSecret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }
    this.accessSecret = accessSecret;
  }



  canActivate(context: ExecutionContext,): boolean | Promise<boolean> {
	
    const httpContext = context.switchToHttp();
    // Guard logic
    const request = httpContext.getRequest();
  
    // Extract headers, body, or parameters to perform your check
    const accessToken = request.headers.authorization;

    console.log('Access token received in guard:', accessToken);

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    // 1. Match 3 segments: Header.Payload.Signature
      const regex = /^Bearer (?<header>[^.]+)\.(?<payload>[^.]+)\.(?<signature>[^.]+)$/;
      const match = accessToken.match(regex);

      if (!match?.groups) {
        throw new UnauthorizedException('Malformed or missing Bearer token format');
      }

      const { header, payload, signature } = match.groups;

      // 2. Re-create the HMAC hash over `${header}.${payload}`
      const expectedSignature = crypto
        .createHmac('sha256', this.accessSecret)
        .update(`${header}.${payload}`)
        .digest('base64url');

      // Constant-time comparison to prevent timing attacks
      const sigBuffer = Buffer.from(signature);
      const expectedBuffer = Buffer.from(expectedSignature);

      if (
        sigBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
      ) {
        throw new UnauthorizedException('Invalid access token signature');
      }

      // 3. Decode payload
      let parsedPayload: { sub?: number | string; exp?: number; [key: string]: any };
      try {
        const jsonString = Buffer.from(payload, 'base64url').toString('utf-8');
        parsedPayload = JSON.parse(jsonString);
      } catch {
        throw new UnauthorizedException('Invalid access token payload format');
      }

      // 4. Validate claims
      if (!parsedPayload.sub) {
        throw new UnauthorizedException(
          'Access token payload does not contain a valid user ID (sub)',
        );
      }

      if (!parsedPayload.exp || parsedPayload.exp < Date.now()) {
        throw new UnauthorizedException('Access token has expired');
      }

      // 5. Attach user info to the request for downstream controllers
      request['user'] = {
        id: parsedPayload.sub,
        ...parsedPayload,
      };

      return true;
    
  }
}
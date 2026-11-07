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

    // Check if the access token contains a valid value and a valid user id
    const regex = /(?<=^Bearer )(?<payload>[^.]+)\.(?<signature>[^.]+)/

    const data = accessToken.match(regex);

    if (!data?.groups) {
      throw new UnauthorizedException('Malformed or missing Bearer token format');
    }

    const  { payload, signature } = data?.groups ;
    
    crypto.createHmac('sha256', this.accessSecret)
      .update(payload)
      .digest('base64url') === signature || (() => { throw new UnauthorizedException('Invalid access token signature') })();

    const jsonString = Buffer.from(payload, 'base64url').toString('utf-8') || (() => { throw new UnauthorizedException('Invalid access token payload') })();
    const parsedPayload = JSON.parse(jsonString) || (() => { throw new UnauthorizedException('Invalid access token payload') })();

    if (!parsedPayload.sub) {
      throw new UnauthorizedException('Access token payload does not contain a valid user ID (sub)');
    }

    if (parsedPayload.exp < Date.now()) {
      throw new UnauthorizedException('Access token is expired');
    } 

    console.log('Access token payload:', parsedPayload);
    console.log('Access token match result:', data);
    return true

  }
}
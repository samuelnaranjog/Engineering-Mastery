import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service.js';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.headers['x-api-key']

    
   
    if(!apiKey || typeof apiKey !== 'string'){
      throw new UnauthorizedException('Invalid Type or missing API key')
    }

    // Figure out the quota state
    const result= this.authService.validateAndDeduct(apiKey)
    console.log('The quota and API check for this key returned:', result)
    if (!result.valid) {
      if (result.reason === 'NOT_FOUND') {
        throw new UnauthorizedException('Invalid or missing API key');
      }
      throw new HttpException(
        'API key quota depleted',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    request.apiKeyOwner = result.owner;
    return true;
  }
}
    
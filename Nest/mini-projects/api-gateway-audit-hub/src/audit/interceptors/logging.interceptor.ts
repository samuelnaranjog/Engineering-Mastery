import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../audit.service.js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const startTime = Date.now();
    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        const durationMs = Date.now() - startTime;
        const statusCode = response.statusCode;
        const apiKeyOwner = request.apiKeyOwner ?? 'anonymous';

        this.auditService.recordLog({
          endpoint: url,
          method,
          statusCode,
          durationMs,
          apiKeyOwner,
          timestamp: new Date(),
        });
      }),
    );
  }
}
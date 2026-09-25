export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export interface AuditLog {
    id: number;
    endpoint: string;
    method: HttpMethod | string;
    statusCode: number;
    durationMs: number;
    apiKeyOwner: string;
    timestamp: Date;
}

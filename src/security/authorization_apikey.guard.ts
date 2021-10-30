import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationApiKeyGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<string[]>('isPublic', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if (isPublic) return true;
    if (!request.headers.apikey) return false;
    return (request.headers.apikey == process.env.API_KEY_VALID)
  }
}
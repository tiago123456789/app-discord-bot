import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationSessionGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<string[]>('isPublic', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (request.session.user == null) {
      return response.redirect("/users/login")
    }
    return true;
  }
}
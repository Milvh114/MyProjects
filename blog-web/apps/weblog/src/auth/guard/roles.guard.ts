import { Role } from '@app/database-type-orm/constants/enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('abc')
    console.log(requiredRoles)
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    requiredRoles.some((role) => user.roles?.includes(role))
    
    return true;
  }
}
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        /**
         * 1. THE REFLECTOR
         * We use the Reflector to extract the metadata we set using the @Roles() decorator.
         * 'getAllAndOverride' means: if the Method (handler) has a role, use that. 
         * If not, check the Class (controller). The Method always wins!
         */
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // If no @Roles decorator is found, the endpoint is public (within the guard's context).
        if (!requiredRoles) {
            return true;
        }

        /**
         * 2. THE REQUEST SCOPE
         * We pull the 'user' object from the request. 
         * IMPORTANT: This object was placed here by JwtAuthGuard right before this guard ran.
         */
        const { user } = context.switchToHttp().getRequest();

        /**
         * 3. THE EXACT MATCH
         * We use .some() to check if at least one of the required roles 
         * (e.g., ['ADMIN']) matches the user's role (e.g., user.role === 'ADMIN').
         * This is a strict string comparison.
         */
        return requiredRoles.some((role) => user?.role === role);
    }
}

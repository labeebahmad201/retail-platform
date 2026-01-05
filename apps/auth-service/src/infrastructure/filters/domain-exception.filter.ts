import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

/**
 * DomainExceptionFilter (The Translator)
 * 
 * ARCHITECTURAL RATIONALE:
 * 1. Why Infrastructure? - It handles HTTP/Framework details (NestJS, Express). 
 *    The Domain shouldn't know what a "Conflict" status code is.
 * 2. The Bridge - This acts as a translation layer between our pure TypeScript 
 *    Domain logic and the outside world (HTTP).
 * 3. Scalability - As you add more domain exceptions (e.g. InsufficientFunds), 
 *    you map them here, keeping your Business Logic 100% clean and platform-agnostic.
 * 4. Performance - Exception filters only execute when an error is thrown. 
 *    Successful requests incur ZERO overhead from this filter.
 * 5. Future Growth - If this file grows too large, you can split it into "Domain Groups" 
 *    (e.g., AuthExceptionFilter, CatalogExceptionFilter) to keep the mapping clear.
 */
@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Default to 500 for safety, but we'll override for known domain errors.
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Map Domain Exceptions to HTTP Status Codes
        if (exception instanceof UserAlreadyExistsException) {
            status = HttpStatus.CONFLICT;
            message = exception.message;
        }

        // This ensures your API stays professional even as the logic gets complex.
        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ProductAlreadyExistsException } from "src/domain/exceptions/product-already-exists.exception";
import { ProductNotFoundException } from "src/domain/exceptions/product-not-found.exception";

@Catch()
export class DomainExceptionFilter implements ExceptionFilter<Error> {
    catch(exception: Error, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        const { user } = request as any;

        // Default to 500 for safety, but we'll override for known domain errors.
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = (exception as any).message || 'Internal server error';

        // 1. Handle NestJS Built-in HTTP Exceptions (401, 403, etc.)
        if ((exception as any).getStatus) {
            status = (exception as any).getStatus();
        }

        // 2. Map Domain Exceptions to HTTP Status Codes
        if (exception instanceof ProductAlreadyExistsException) {
            status = HttpStatus.CONFLICT;
            message = exception.message;
        }

        if (exception instanceof ProductNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        }

        // CRITICAL DEBUG LOG
        console.error('--- Catalog DomainExceptionFilter ---');
        console.error('Exception Name:', (exception as any).name);
        console.error('Exception Message:', message);
        console.error('Status:', status);
        console.error('Path:', request.url);
        console.error('Authorization Header:', request.headers['authorization'] || 'MISSING');
        console.error('User in Request:', user ? 'PRESENT' : 'MISSING');
        console.error('-------------------------------------');

        // This ensures your API stays professional even as the logic gets complex.
        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });

    }
}
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ProductAlreadyExistsException } from "src/domain/exceptions/product-already-exists.exception";
import { ProductNotFoundException } from "src/domain/exceptions/product-not-found.exception";

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter<Error> {
    catch(exception: Error, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        // Default to 500 for safety, but we'll override for known domain errors.
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        // Map Domain Exceptions to HTTP Status Codes
        if (exception instanceof ProductAlreadyExistsException) {
            status = HttpStatus.CONFLICT;
            message = exception.message;
        }

        if (exception instanceof ProductNotFoundException) {
            status = HttpStatus.NOT_FOUND;
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

export class ProductAlreadyExistsException extends Error {
    constructor(field?: string) {
        const message = field
            ? `A product with this ${field} already exists.`
            : 'A product with these details already exists.';
        super(message);
        this.name = 'ProductAlreadyExistsException';
    }
}
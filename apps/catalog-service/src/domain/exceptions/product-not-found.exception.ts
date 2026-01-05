export class ProductNotFoundException extends Error {
    constructor(identifier: string) {
        super(`Product with identifier "${identifier}" was not found.`);
        this.name = 'ProductNotFoundException';
    }
}

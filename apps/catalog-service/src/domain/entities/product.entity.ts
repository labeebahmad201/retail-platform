export class Product {
    constructor(
        public readonly id: string,
        public readonly sku: string,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly isActive: boolean,
        public readonly category: string,
        public readonly images: string[],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    /**
     * 🏗️ Static Factory Method
     * 
     * Why: This is a "Named Constructor" that explicitly defines the business process 
     * for creating a new product. It decouples the "Manual" input (SKU, Name, Price) 
     * from "System" logic like IDs and Timestamps.
     * 
     * Benefits:
     * 1. Readability: `Product.create()` is more expressive than `new Product()`.
     * 2. Encapsulation: It automatically handles side effects like `createdAt` and `updatedAt`.
     * and limits access to createdAt and updatedAt, as user should not be able to assign those.
     * 3. Consistency: Ensures an entity is always born in a valid, "Hydrated" state.
     */
    static create(data: Omit<Product, 'createdAt' | 'updatedAt'>) {

        return new Product(
            data.id,
            data.sku,
            data.name,
            data.description || '', // it's optional param so transform it to a valid state.
            data.price,
            data.isActive,
            data.category,
            data.images,
            new Date(),
            new Date()
        )
    }
}
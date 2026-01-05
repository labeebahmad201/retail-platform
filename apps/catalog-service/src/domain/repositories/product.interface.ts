import { Product } from "../entities/product.entity";

export interface IProductInterface {
    findAll(filter): Promise<Product[]>;
    findBySku(sku: string): Promise<Product | null>;
    save(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>;
    delete(productId: string): Promise<void>;
    disable(productId: string): Promise<boolean>;
    enable(productId: string): Promise<boolean>;
}

export const IPRODUCT_INTERFACE = Symbol('IPRODUCT_INTERFACE')
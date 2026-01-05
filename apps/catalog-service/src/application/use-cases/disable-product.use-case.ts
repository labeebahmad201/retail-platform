import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';

@Injectable()
export class DisableProductUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
    ) { }

    async execute(productId: string): Promise<boolean> {
        // We first verify if the product exists. 
        // Note: Repository findById would be better here, but we can use findBySku or similar if needed.
        // For simplicity, we'll use the repository's direct disable method which handles the P2002/P2025 errors.

        const success = await this.productRepo.disable(productId);

        if (!success) {
            throw new NotFoundException(`Product with ID "${productId}" not found.`);
        }

        return true;
    }
}

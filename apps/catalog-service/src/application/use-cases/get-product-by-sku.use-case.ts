import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class GetProductBySkuUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
    ) { }

    async execute(sku: string): Promise<Product> {
        const product = await this.productRepo.findBySku(sku);

        if (!product || !product.isActive) {
            throw new NotFoundException(`Product with SKU "${sku}" not found.`);
        }

        return product;
    }
}

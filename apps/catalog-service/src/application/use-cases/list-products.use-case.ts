import { Inject, Injectable } from '@nestjs/common';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class ListProductsUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
    ) { }

    async execute(filter?: { category?: string }): Promise<Product[]> {
        // Here we could add more logic like "only show active products"
        return await this.productRepo.findAll({
            isActive: true,
            ...filter
        });
    }
}

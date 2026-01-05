import { Inject, Injectable } from '@nestjs/common';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class ListAdminProductsUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
    ) { }

    async execute(filter?: { category?: string }): Promise<Product[]> {
        // Admin view: Show everything (including inactive)
        return await this.productRepo.findAll(filter);
    }
}

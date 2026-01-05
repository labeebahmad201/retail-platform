import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';

@Injectable()
export class EnableProductUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
    ) { }

    async execute(productId: string): Promise<boolean> {
        const success = await this.productRepo.enable(productId);

        if (!success) {
            throw new NotFoundException(`Product with ID "${productId}" not found.`);
        }

        return true;
    }
}

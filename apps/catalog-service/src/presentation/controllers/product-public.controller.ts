import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { GetProductBySkuUseCase } from '../../application/use-cases/get-product-by-sku.use-case';

@Controller('products')
export class ProductPublicController {
    constructor(
        private readonly listProductsUseCase: ListProductsUseCase,
        private readonly getProductBySkuUseCase: GetProductBySkuUseCase
    ) { }

    @Get()
    async findAll(@Query('category') category?: string) {
        return await this.listProductsUseCase.execute({ category });
    }

    @Get(':sku')
    async findOne(@Param('sku') sku: string) {
        return await this.getProductBySkuUseCase.execute(sku);
    }
}

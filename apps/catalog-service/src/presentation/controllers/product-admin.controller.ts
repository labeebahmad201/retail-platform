import { Body, Controller, Param, Patch, Post, Get, Query, ValidationPipe } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DisableProductUseCase } from '../../application/use-cases/disable-product.use-case';
import { EnableProductUseCase } from '../../application/use-cases/enable-product.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { ListAdminProductsUseCase } from '../../application/use-cases/list-admin-products.use-case';

@Controller('admin/products')
export class ProductAdminController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly disableProductUseCase: DisableProductUseCase,
        private readonly enableProductUseCase: EnableProductUseCase,
        private readonly listAdminProductsUseCase: ListAdminProductsUseCase
    ) { }

    @Get()
    async findAll(@Query('category') category?: string) {
        return await this.listAdminProductsUseCase.execute({ category });
    }

    @Post()
    async create(@Body(ValidationPipe) dto: CreateProductDto) {
        return await this.createProductUseCase.execute(dto);
    }

    @Patch(':id/disable')
    async disable(@Param('id') id: string) {
        return await this.disableProductUseCase.execute(id);
    }

    @Patch(':id/enable')
    async enable(@Param('id') id: string) {
        return await this.enableProductUseCase.execute(id);
    }
}

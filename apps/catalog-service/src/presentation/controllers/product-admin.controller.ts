import { Body, Controller, Inject, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DisableProductUseCase } from '../../application/use-cases/disable-product.use-case';
import { EnableProductUseCase } from '../../application/use-cases/enable-product.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';

@Controller('admin/products')
export class ProductAdminController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly disableProductUseCase: DisableProductUseCase,
        private readonly enableProductUseCase: EnableProductUseCase
    ) { }

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

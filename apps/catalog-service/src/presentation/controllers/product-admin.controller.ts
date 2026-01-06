import { Body, Controller, Param, Patch, Post, Get, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DisableProductUseCase } from '../../application/use-cases/disable-product.use-case';
import { EnableProductUseCase } from '../../application/use-cases/enable-product.use-case';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { ListAdminProductsUseCase } from '../../application/use-cases/list-admin-products.use-case';
import { JwtAuthGuard } from '../../infrastructure/security/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/roles.guard';
import { Roles } from '../../infrastructure/security/roles.decorator';

@Controller('admin/products')
/**
 *   The Security Trinity
 * 
 * 1. JwtAuthGuard: The "Front Door Bouncer." It triggers the JwtStrategy 
 *    to verify the token's signature, expiry, and secret.
 * 2. JwtStrategy: The "Decoder." It unpacks the signed JWT payload 
 *    and attaches user info (id, email, role) to the Request object.
 * 3. RolesGuard: The "VIP Section Guard." It checks the request.user.role 
 *    against the @Roles('ADMIN') decorator value to ensure the user is powerful enough.
 */
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
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

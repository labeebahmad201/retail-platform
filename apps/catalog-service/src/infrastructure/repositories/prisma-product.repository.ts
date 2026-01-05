import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product.entity";
import { IProductInterface } from "src/domain/repositories/product.interface";
import { PrismaService } from "../services/prisma.service";
import { Product as PrismaProduct } from '../services/prisma/browser'
import { ProductAlreadyExistsException } from "src/domain/exceptions/product-already-exists.exception";
import { ProductNotFoundException } from "src/domain/exceptions/product-not-found.exception";

@Injectable()
export class PrismaProductRepository implements IProductInterface {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async findAll(filter?: any): Promise<Product[]> {
        const models = await this.prismaService.product.findMany({
            where: filter
        });
        const products = models.map((model) => this.mapToDomain(model))
        return products;
    }

    async findBySku(sku: string): Promise<Product | null> {
        const model = await this.prismaService.product.findUnique({
            where: {
                sku
            }
        });
        return model ? this.mapToDomain(model) : null;
    }

    async save(product: Product): Promise<Product> {
        try {
            const model: PrismaProduct = await this.prismaService.product.create({
                data: {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    isActive: product.isActive,
                    category: product.category,
                    images: product.images,
                    quantity: product.quantity,
                }
            })
            return this.mapToDomain(model)
        } catch (error: any) {
            if (error && error.code === 'P2002') {
                const target = error.meta?.target?.[0] || 'unique field';
                throw new ProductAlreadyExistsException(target);
            }
            throw error;
        }

    }

    async update(product: Product): Promise<Product> {
        try {
            const model: PrismaProduct = await this.prismaService.product.update({
                where: { id: product.id },
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    isActive: product.isActive,
                    category: product.category,
                    images: product.images,
                    quantity: product.quantity,
                }
            });
            return this.mapToDomain(model);
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                throw new ProductNotFoundException(product.id || 'unknown');
            }
            throw error;
        }
    }

    async delete(productId: string): Promise<void> {
        try {
            await this.prismaService.product.delete({
                where: {
                    id: productId
                }
            });
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                throw new ProductNotFoundException(productId);
            }
            throw error;
        }
    }

    async disable(productId: string): Promise<boolean> {
        try {
            await this.prismaService.product.update({
                where: {
                    id: productId
                },
                data: {
                    isActive: false
                }
            });
            return true;
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                throw new ProductNotFoundException(productId);
            }
            throw error;
        }
    }

    async enable(productId: string): Promise<boolean> {
        try {
            await this.prismaService.product.update({
                where: {
                    id: productId
                },
                data: {
                    isActive: true
                }
            });
            return true;
        } catch (error: any) {
            if (error && error.code === 'P2025') {
                throw new ProductNotFoundException(productId);
            }
            throw error;
        }
    }

    mapToDomain(model: PrismaProduct): Product {
        return new Product(
            model.id,
            model.sku,
            model.name,
            model.description,
            model.price,
            model.isActive,
            model.category,
            model.images,
            model.quantity,
            model.createdAt,
            model.updatedAt
        )
    }
}

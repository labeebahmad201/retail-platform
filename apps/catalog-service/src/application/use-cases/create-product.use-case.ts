import { Inject, Injectable } from '@nestjs/common'
import { Product } from 'src/domain/entities/product.entity';
import { IPRODUCT_INTERFACE, type IProductInterface } from 'src/domain/repositories/product.interface';
import { CreateProductDto } from '../dtos/create-product.dto';
import { I_ID_GENERATOR_INTERFACE, type IIdGeneratorInterface } from 'src/domain/ports/id-generator.port';

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject(IPRODUCT_INTERFACE) private readonly productRepo: IProductInterface,
        /**
         * 🔌 The ID Generator Port
         * 
         * Why: The Use Case needs an ID to create a new Product, but it shouldn't care 
         * HOW that ID is generated (CUID, UUID, etc.). By injecting the Port, we 
         * keep the Application layer "Technology Blind."
         */
        @Inject(I_ID_GENERATOR_INTERFACE) private readonly idGenerator: IIdGeneratorInterface,
    ) { }

    async execute(dto: CreateProductDto) {
        const id = this.idGenerator.generateId();
        const entity = Product.create({
            ...dto,
            id,
            isActive: true,
            category: dto.category,
            images: [] // todo: add images.
        })
        return await this.productRepo.save(entity)
    }
}
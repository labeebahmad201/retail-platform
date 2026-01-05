import 'dotenv/config'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Domain Interfaces
import { I_ID_GENERATOR_INTERFACE } from './domain/ports/id-generator.port';
import { IPRODUCT_INTERFACE } from './domain/repositories/product.interface';

// Infrastructure
import { CuidGenerator } from './infrastructure/adapters/cuid-generator';
import { PrismaService } from './infrastructure/services/prisma.service';
import { PrismaProductRepository } from './infrastructure/repositories/prisma-product.repository';

// Application
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case';
import { GetProductBySkuUseCase } from './application/use-cases/get-product-by-sku.use-case';
import { DisableProductUseCase } from './application/use-cases/disable-product.use-case';
import { EnableProductUseCase } from './application/use-cases/enable-product.use-case';

// Presentation
import { ProductAdminController } from './presentation/controllers/product-admin.controller';
import { ProductPublicController } from './presentation/controllers/product-public.controller';


@Module({
  imports: [],
  controllers: [AppController, ProductAdminController, ProductPublicController],
  providers: [
    AppService,
    PrismaService,
    CreateProductUseCase,
    ListProductsUseCase,
    GetProductBySkuUseCase,
    DisableProductUseCase,
    EnableProductUseCase,
    /**
     * 🤝 The Matchmaker (Dependency Injection)
     * 
     * Why: This is where we bind the Abstract Port (I_ID_GENERATOR_INTERFACE) 
     * to the Concrete Adapter (CuidGenerator). 
     * 
     * Benefit: The rest of the app only knows about the Port, making the system 
     * modular and easy to test.
     */
    {
      provide: I_ID_GENERATOR_INTERFACE,
      useClass: CuidGenerator
    },
    {
      provide: IPRODUCT_INTERFACE,
      useClass: PrismaProductRepository
    }
  ],
})
export class AppModule { }

import { IsIn, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)    
    sku: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsIn(['books', 'gadgets', 'gaming'])
    category: string;
}
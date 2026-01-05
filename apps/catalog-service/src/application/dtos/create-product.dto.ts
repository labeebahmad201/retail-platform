import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";


export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity?: number;

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
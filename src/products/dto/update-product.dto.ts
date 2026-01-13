import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsNumber, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    // @IsNumber()
    // @IsPositive()
    // id: number;
}

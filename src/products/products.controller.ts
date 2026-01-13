import { Controller, Delete, Get, Param, Patch, Post,Body ,Inject, Query, BadRequestException, ParseIntPipe} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { services } from '../config/services';



import { PaginationDto } from '../common/dto/pagination.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



@Controller('products')
export class ProductsController {
  constructor(
    @Inject(services.PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  async findProductById(@Param('id') id: number) {
    //? 1: return this.productsClient.send({ cmd: 'find_product' }, { id });
    //? 2 try{
    //?   const product =  await firstValueFrom(this.productsClient.send({ cmd: 'find_product' }, { id }));

    //?   return product;

    //? } catch (error) {
    //?   throw new RpcException(error);
    //? }

    return this.productsClient.send({cmd: 'find_product'}, {id}).pipe(
      catchError(error => {throw new RpcException(error)})
    )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}

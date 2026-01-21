import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { CreateOrderDto, OrderPaginationDto, UpdateOrderDto, } from './dto/index';
import { services } from '../config/services';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from './../common/dto/pagination.dto';
import { StatusDto } from './dto/status.dto';



@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(services.ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log('createOrderDto', createOrderDto);
    return this.ordersClient.send( 'createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(this.ordersClient.send('findOneOrder' , { id }));
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllStatus(@Param() statusDto: StatusDto, @Query() paginationDto: PaginationDto) {
    try{
      return this.ordersClient.send('findAllOrdersByStatus', { ...paginationDto, status: statusDto.status });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    try{
      return this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status });
    } catch (error) {
      throw new RpcException(error);
    }
  }

}

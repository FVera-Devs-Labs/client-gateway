import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { services } from '../config/services';
import { envs } from '../config/envs';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: services.PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PRODUCTS_MICROSERVICE_HOST,
          port: envs.PRODUCTS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}

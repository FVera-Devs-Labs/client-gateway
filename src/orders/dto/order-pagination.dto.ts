import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';
import { OrderStatus } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatus, { message: `Possible values are: ${ OrderStatusList.join(', ') }` })
    status?: OrderStatus;
}
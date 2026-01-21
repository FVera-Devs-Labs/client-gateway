import { IsEnum } from "class-validator";
import { OrderStatus } from "../enum/order.enum";
import { OrderStatusList } from "../enum/order.enum";

export class StatusDto {
    @IsEnum(OrderStatus, { message: `Possible values are: ${ OrderStatusList.join(', ') }` })
    status: OrderStatus;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export const OrderStatusList = Object.values(OrderStatus);
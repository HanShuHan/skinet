import {Address} from "./user";

export class OrderToCreate {
  simpleBasketId: string
  addressDto: Address
  deliveryMethodId: number

  constructor(simpleBasketId: string, addressDto: Address, deliveryMethodId: number) {
    this.simpleBasketId = simpleBasketId;
    this.addressDto = addressDto;
    this.deliveryMethodId = deliveryMethodId;
  }
}

export interface DeliveryMethod {
  id: number
  name: string
  description: string
  approximatedDeliveryDays: string
  price: number
}

export interface Order {
  id: number
  orderItems: OrderItem[]
  shippingAddress: Address
  orderStatus: string
  deliveryMethod: string
  deliveryFee: number
  orderDate: string
  subtotal: number
  tax: number
  total: number
}

export interface OrderItem {
  productId: number
  productName: string
  description: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
  subtotal: number
}


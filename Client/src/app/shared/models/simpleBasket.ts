import * as  cuid from "cuid";
import {Product} from "./product";
import {TAX_RATE} from "../constants";

export class SimpleBasket {
  id: string = cuid();
  items: SimpleBasketItem[] = []
}

export class SimpleBasketItem {

  productId: number;
  quantity: number;

  constructor(productId: number, quantity: number = 1) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export interface BasketItem {
  item: Product;
  quantity: number
}

export class BasketSubtotals {

  subTotal: number = 0;
  tax: number = 0;
  shipping: number = 0;

  constructor(subTotal: number, shipping?: number) {
    this.subTotal = subTotal;
    this.tax = subTotal * TAX_RATE;
  }

  getTotal(): number {
    return this.subTotal + this.tax + this.shipping;
  }

}

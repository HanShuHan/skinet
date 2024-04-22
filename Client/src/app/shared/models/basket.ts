import {Product} from "./product";
import {environment} from "../../../environments/environment";
import * as  cuid from "cuid";

export class Basket {
  id: string = cuid();
  items: BasketItem[] = []
}

export class BasketItem {

  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;

  constructor(product: Product, quantity: number = 1) {
    this.id = product.id;
    this.productName = product.name;
    this.price = product.price;
    this.quantity = quantity;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.productBrand;
    this.type = product.productType;
  }
}

export class BasketSubtotals {

  subTotal: number = 0;
  tax: number = 0;
  shipping: number = 0;

  constructor(subTotal: number, shipping?: number) {
    this.subTotal = subTotal;
    this.tax = subTotal * environment.taxRate;
  }

  getTotal(): number {
    return this.subTotal + this.tax + this.shipping;
  }

}

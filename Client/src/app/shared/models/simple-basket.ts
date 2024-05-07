import * as  cuid from "cuid";
import {Product} from "./product";
import {TAX_RATE} from "../../../constants/number.constants";

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

export class BasketTotals {

  private _subTotal: number = 0;
  private _tax: number = 0;
  private _shipping?: number | undefined;
  private _total?: number | undefined;

  constructor(subTotal: number, shipping?: number) {
    this._subTotal = subTotal;
    this._tax = subTotal * TAX_RATE;
    if (shipping !== undefined) {
      this._shipping = shipping;
    }
    this.calculateTotal();
  }

  get subTotal() {
    return this._subTotal;
  }

  set subTotal(subtotal: number) {
    this._subTotal = subtotal;
    this._tax = subtotal * TAX_RATE;
    this.calculateTotal();
  }

  get tax() {
    return this._tax;
  }

  get shipping(): number | undefined {
    return this._shipping;
  }

  set shipping(shipping: number | undefined) {
    this._shipping = shipping;
    this.calculateTotal();
  }

  get total(): number | undefined {
    return this._total;
  }

  private calculateTotal() {
    this._total = (this._shipping === undefined) ? (this._subTotal + this._tax) : (this._subTotal + this._tax + this._shipping);
  }

}

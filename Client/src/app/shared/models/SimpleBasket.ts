import {Address} from "./user";

export interface SimpleBasket {
  id: string;
  items: SimpleBasketItem[];
  deliveryMethodId?: number;
  shippingAddress?: Address;
  paymentIntentId?: string;
  clientSecret?: string;
}

export class SimpleBasketItem {

  productId: number;
  quantity: number;

  constructor(productId: number, quantity: number = 1) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class BasketTotals {

  private _subTotal: number;
  private _tax: number;
  private _shipping?: number;
  private _total: number;

  constructor(subTotal: number, taxRate: number, shipping: number | undefined) {
    this._subTotal = subTotal;
    this._tax = this._subTotal * taxRate;
    this._total = this._subTotal + this._tax;
    if (typeof shipping === 'number') {
      this._shipping = shipping;
      this._total += this._shipping;
    }
  }

  get subTotal() {
    return this._subTotal;
  }

  get tax() {
    return this._tax;
  }

  get shipping(): number | undefined {
    return this._shipping;
  }

  set shipping(shipping: number | undefined) {
    this._shipping = shipping;
    if (shipping) {
      this._total += shipping;
    }
  }

  get total(): number {
    return this._total;
  }

}

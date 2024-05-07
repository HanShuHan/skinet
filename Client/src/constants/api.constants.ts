export class ApiUrl {
  // Base
  static readonly base = 'https://localhost:5001/api/';
  // Account
  static readonly account = this.base + 'account/';
  static readonly login = this.account + 'login/';
  static readonly register = this.account + 'register/';
  static readonly checkEmailNotInUse = this.account + 'emailNotInUse/';
  static readonly address = this.account + 'address/';
  // Shop
  static readonly shop = this.base + 'shop/';
  static readonly products = this.base + 'products/';
  static readonly basket = this.base + 'basket/';
  static readonly orders = this.base + 'orders/';
  static readonly deliveryMethods = this.orders + 'deliveryMethods/';
  // Checkout
  static readonly checkout = this.base + 'checkout/';
}

export class ApiPath {
  static readonly shop = '/shop';
  static readonly login = '/account/login';
  static readonly checkoutOrder = '/checkout/order';
}

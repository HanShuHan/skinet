export class ApiUrl {
  // Base
  static readonly BASE = 'https://localhost:5001/api';
  // Account
  static readonly ACCOUNT = this.BASE + '/account';
  static readonly LOGIN = this.ACCOUNT + '/login';
  static readonly REGISTER = this.ACCOUNT + '/register';
  static readonly CHECK_EMAIL_NOT_IN_USE = this.ACCOUNT + '/emailNotInUse';
  static readonly ADDRESS = this.ACCOUNT + '/address';
  // Shop
  static readonly SHOP = this.BASE + '/shop';
  static readonly PRODUCTS = this.BASE + '/products';
  static readonly TAX_RATE = this.PRODUCTS + '/taxRate';
  static readonly BASKET = this.BASE + '/basket';
  static readonly PAYMENTS = this.BASE + '/payments';
  static readonly ORDERS = this.BASE + '/orders';
  static readonly DELIVERY_METHODS = this.ORDERS + '/deliveryMethods';
  // Checkout
  static readonly CHECKOUT = this.BASE + '/checkout';
}

export class Route {
  // Account
  static readonly ACCOUNT = 'account';
  static readonly REGISTER = 'register';
  static readonly LOGIN = 'login';
  static readonly PROFILE = 'account-profile';
  //
  static readonly SHOP = 'shop';
  static readonly BASKET = 'basket';
  static readonly CHECKOUT = 'checkout';
  static readonly SUCCESS = 'success';
  static readonly ORDERS = 'orders';
}

export class Path {
  // Account
  static readonly ACCOUNT = '/' + Route.ACCOUNT;
  static readonly REGISTER = '/' + Route.ACCOUNT + '/' + Route.REGISTER;
  static readonly LOGIN = '/' + Route.ACCOUNT + '/' + Route.LOGIN;
  static readonly PROFILE = '/' + Route.ACCOUNT + '/' + Route.PROFILE;
  //
  static readonly SHOP = '/' + Route.SHOP;
  static readonly BASKET = '/' + Route.BASKET;
  static readonly CHECKOUT = '/' + Route.CHECKOUT;
  static readonly SUCCESS = '/' + Route.SUCCESS;
  static readonly CHECKOUT_SUCCESS = '/' + Route.CHECKOUT + '/' + Route.SUCCESS;
  static readonly ORDERS = '/' + Route.ORDERS;
}

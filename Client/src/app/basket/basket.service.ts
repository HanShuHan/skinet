import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Baskets, BasketTotals, SimpleBasket, SimpleBasketItem} from "../shared/models/simple-basket";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Product} from "../shared/models/product";
import {ShopService} from "../shop/shop.service";
import {ApiUrl} from "../../constants/api.constants";
import {Address} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // Simple basket for Redis
  private simpleBasketSource = new BehaviorSubject<SimpleBasket | null>(null);
  simpleBasketSource$ = this.simpleBasketSource.asObservable();
  // Basket Items
  private productItemsSource = new BehaviorSubject<Product[] | null>(null);
  productItemsSource$ = this.productItemsSource.asObservable();
  // The basket's subtotals
  private totalsSource = new BehaviorSubject<BasketTotals | null>(null);
  totalsSource$ = this.totalsSource.asObservable();
  // Error messages
  private basketItemsNotMatchingErrorMessage: string = 'There is something wrong with the basket\nThe product information does not match the items in the basket';

  constructor(private httpClient: HttpClient, private shopService: ShopService, private toastrService: ToastrService) {
  }

  addItemToBasket(quantity: number = 1, product: Product): void {
    this.addItemAndUpdateBaskets(quantity, product);
  }

  private addItemAndUpdateBaskets(quantity: number, product: Product) {
    this.createBasketSourcesIfNull();

    //
    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;
    const copyOfProductItems = this.copyProductItemsSource() as Product[];
    const copyOfBasketItems = copyOfSimpleBasket.items;

    if (copyOfBasketItems.length !== copyOfProductItems.length) {
      throw new Error(this.basketItemsNotMatchingErrorMessage);
    }

    //
    const copyOfExistingItem = copyOfBasketItems?.find(item => item.productId === product.id);

    if (copyOfBasketItems.length && copyOfExistingItem) {
      copyOfExistingItem.quantity += quantity;
    } else {
      copyOfBasketItems.push(new SimpleBasketItem(product.id, quantity));
      copyOfProductItems.push(product);
    }
    this.updateBasketWith(copyOfSimpleBasket, copyOfProductItems);
  }

  private createBasketSourcesIfNull() {
    this.createSimpleBasketIfNull()
    this.createProductItemsIfNull();
  }

  private createProductItemsIfNull() {
    if (!this.getProductItemsSource()) {
      this.setProductItemsSource([]);
    }
  }

  updateBasketWith(simpleBasket: SimpleBasket, productItems?: Product[]) {
    this.httpClient.post<SimpleBasket>(ApiUrl.BASKET, simpleBasket)
      .subscribe({
        next: updatedSimpleBasket => {
          this.setSimpleBasketSource(updatedSimpleBasket);
          if (productItems) {
            this.setProductItemsSource(productItems);
          }
          this.calculateTotals(); // Todo:
        },
        error: err => console.log(err)
      });
  }

  removeBasketItemByProductId(id: number): void {
    if (this.hasNonEmptyValidBaskets()) {
      const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;
      const copyOfProductItems = this.copyProductItemsSource() as Product[];

      copyOfSimpleBasket.items.filter(item => item.productId !== id);
      copyOfProductItems.filter(product => product.id !== id);

      this.updateBasketWith(copyOfSimpleBasket, copyOfProductItems);
    }
  }

  getSimpleBasketSource() {
    return this.simpleBasketSource.value;
  }

  getProductItemsSource() {
    return this.productItemsSource.value;
  }

  loadLocalBasketById(id: string) {
    this.getSimpleBasketById(id)
      .subscribe({
        next: simpleBasket => {
          if (simpleBasket) {
            this.setSimpleBasketSource(simpleBasket);
            this.loadBasketProducts();
          }
        },
        error: err => console.log(err)
      });
  }

  private getSimpleBasketById(id: string) {
    return this.httpClient.get<SimpleBasket | null>(`${ApiUrl.BASKET}/${id}`);
  }

  loadBasketProducts() {
    const simpleBasketItems = this.getSimpleBasketSource()?.items;
    if (simpleBasketItems?.length) {
      const productIds = simpleBasketItems.map(item => item.productId);
      this.shopService.getProductsByIds(productIds)
        .subscribe({
          next: products => {
            this.setProductItemsSource(products.data);
            this.calculateTotals();
          },
          error: err => console.log(err)
        });
    }
  }

  deleteBasket() {
    const basketId = this.getSimpleBasketSource()?.id;
    const localBasket = localStorage.getItem(environment.basketId);
    const simpleBasket = this.getSimpleBasketSource();
    const basketItems = this.getProductItemsSource();

    if (basketId) {
      this.httpClient.delete(ApiUrl.BASKET + basketId);
    }
    if (localBasket) {
      localStorage.removeItem(environment.basketId);
    }
    if (simpleBasket) {
      this.setSimpleBasketSource(null);
    }
    if (basketItems) {
      this.setProductItemsSource(null);
    }
  }

  calculateTotals(): void {
    const simpleBasketItems = this.getSimpleBasketSource()?.items;
    const productItems = this.getProductItemsSource();
    if (simpleBasketItems?.length && productItems?.length && (simpleBasketItems.length === productItems.length)) {
      let subtotal = 0;
      for (let i = 0; i < simpleBasketItems.length; i++) {
        subtotal += productItems[i].price * simpleBasketItems[i].quantity;
      }
      this.shopService.getTaxRate()
        .subscribe({
          next: taxRate => this.setTotalsSource(new BasketTotals(subtotal, taxRate)),
          error: err => console.log(err)
        })
    }
  }

  private setSimpleBasketSource(basket: SimpleBasket | null) {
    this.simpleBasketSource.next(basket);
  }

  private setProductItemsSource(products: Product[] | null) {
    this.productItemsSource.next(products);
  }

  getTotalsSource() {
    return this.totalsSource.value;
  }

  private setTotalsSource(subTotals: BasketTotals) {
    this.totalsSource.next(subTotals);
  }

  private createSimpleBasket() {
    this.httpClient.get<SimpleBasket>(ApiUrl.BASKET)
      .subscribe({
        next: simpleBasket => {
          this.setSimpleBasketSource(simpleBasket);
          localStorage.setItem(environment.basketId, simpleBasket.id);
        },
        error: err => {
          console.log(err);
          this.toastrService.warning('please try again later', 'Failed to create a basket');
        }
      });
  }

  increment(quantity: number, productId: number) {
    this.crea()

    if (!this.hasNonEmptyValidBaskets()) {
      throw Error(this.basketItemsNotMatchingErrorMessage);
    }


    const simpleBasket = this.getSimpleBasketSource();
    const productItems = this.getProductItemsSource();

    if (simpleBasket && productItems && (simpleBasket.items.length === productItems.length)) {

    }
  }

  decrement(quantity: number, productId: number) {
    const simpleBasket = this.getSimpleBasketSource();
    const productItems = this.getProductItemsSource();

    if (simpleBasket && productItems && (simpleBasket.items.length === productItems.length)) {

    }
  }

  private hasNonEmptyValidBaskets() {
    const simpleBasket = this.getSimpleBasketSource();
    const productItems = this.getProductItemsSource();

    return simpleBasket?.items.length
      && productItems?.length
      && (simpleBasket.items.length === productItems.length);
  }

  private copySimpleBasketSource() {
    const simpleBasketSource = this.getSimpleBasketSource();

    return simpleBasketSource ? {...simpleBasketSource} : null;
  }

  private copyProductItemsSource() {
    const productItemsSource = this.getProductItemsSource();

    return productItemsSource ? [...productItemsSource] : null;
  }

  private copyBasketSources() {
    const copyOfSimpleBasket = this.copySimpleBasketSource();
    const copyOfProductItems = this.copyProductItemsSource();

    return {copyOfSimpleBasket, copyOfProductItems};
  }

  updateSimpleBasketDeliveryMethodId(id: number) {
    this.createSimpleBasketIfNull();

    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;

    copyOfSimpleBasket.deliveryMethodId = id;

    this.updateBasketWith(copyOfSimpleBasket);
  }

  private createSimpleBasketIfNull() {
    if (!this.getSimpleBasketSource()) {
      this.createSimpleBasket();
    }
  }

  updateSimpleBasketAddress(address: Address) {
    this.createSimpleBasketIfNull();

    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;

    copyOfSimpleBasket.shippingAddress = address;

    this.updateBasketWith(copyOfSimpleBasket);
  }
}

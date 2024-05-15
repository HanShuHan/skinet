import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {BasketTotals, SimpleBasket, SimpleBasketItem} from "../shared/models/SimpleBasket";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Product} from "../shared/models/product";
import {ShopService} from "../shop/shop.service";
import {ApiUrl} from "../../constants/api.constants";
import {Address} from "../shared/models/user";
import {MAX_QUANTITY} from "../../constants/number.constants";
import {DeliveryMethod} from "../shared/models/order";

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

  constructor(private httpClient: HttpClient, private shopService: ShopService, private toastrService: ToastrService) {
  }

  addItemToBasket(quantity: number = 1, product: Product) {
    this.addItemAndUpdateBasketSources(quantity, product);
  }

  private addItemAndUpdateBasketSources(quantity: number, product: Product) {
    this.createBasketSourcesIfNull();

    //
    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;
    const copyOfProductItems = this.copyProductItemsSource() as Product[];
    const copyOfBasketItems = copyOfSimpleBasket.items;
    const copyOfExistingItem = copyOfBasketItems?.find(item => item.productId === product.id);

    if (copyOfBasketItems.length && copyOfExistingItem) {
      copyOfExistingItem.quantity += quantity;
    } else {
      copyOfBasketItems.unshift(new SimpleBasketItem(product.id, quantity));
      copyOfProductItems.unshift(product);
    }

    this.updateBasketSourcesAndRecalculate(copyOfSimpleBasket, copyOfProductItems);
  }

  updateBasketSourcesAndRecalculate(simpleBasket: SimpleBasket, productItems?: Product[]) {
    this.httpClient.post<SimpleBasket>(ApiUrl.BASKET, simpleBasket)
      .subscribe({
        next: updatedSimpleBasket => {
          this.setSimpleBasketSource(updatedSimpleBasket);
          if (productItems) {
            this.setProductItemsSource(productItems);
          }
          this.calculateTotals();
        },
        error: err => console.log(err)
      });
  }

  removeBasketItemByIndex(index: number): void {
    const copyOfSimpleBasket = this.copySimpleBasketSource();
    const copyOfProductItems = this.copyProductItemsSource();

    copyOfSimpleBasket.items.splice(index, 1);
    copyOfProductItems.splice(index, 1);

    this.updateBasketSourcesAndRecalculate(copyOfSimpleBasket, copyOfProductItems);
  }

  getSimpleBasketSource() {
    return this.simpleBasketSource.value;
  }

  private getProductItemsSource() {
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
    const simpleBasketItems = this.getSimpleBasketSource()!.items;

    if (simpleBasketItems.length) {
      const productIds = simpleBasketItems.map(item => item.productId);

      this.shopService.getProductsByIds(productIds)
        .subscribe({
          next: products => {
            this.setProductItemsSource(products.data);
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
      this.httpClient.delete(`${ApiUrl.BASKET}/${basketId}`);
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

  getDeliveryMethodById(id: number): Observable<DeliveryMethod> {
    return this.httpClient.get<DeliveryMethod>(`${ApiUrl.DELIVERY_METHODS}/${id}`);
  }

  calculateTotals(): void {
    const simpleBasket = this.getSimpleBasketSource();
    const simpleBasketItems = simpleBasket!.items;
    const productItems = this.getProductItemsSource();
    let subtotal = 0;
    let shippingFee: number | undefined;

    for (let i = 0; i < simpleBasketItems.length; i++) {
      subtotal += productItems![i].price * simpleBasketItems[i].quantity;
    }
    if (simpleBasket?.deliveryMethodId) {
      this.getDeliveryMethodById(simpleBasket.deliveryMethodId)
        .subscribe({
          next: deliveryMethod => shippingFee = deliveryMethod.price,
          error: err => console.log(err)
        });
    }
    this.shopService.getTaxRate()
      .subscribe({
        next: taxRate => this.setTotalsSource(new BasketTotals(subtotal, taxRate, shippingFee)),
        error: err => console.log(err)
      })
  }

  setSimpleBasketSource(basket: SimpleBasket | null) {
    this.simpleBasketSource.next(basket);
  }

  private setProductItemsSource(products: Product[] | null) {
    this.productItemsSource.next(products);
  }

  private getTotalsSource() {
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

  private copySimpleBasketSource() {
    return {...this.getSimpleBasketSource() as SimpleBasket};
  }

  private copyProductItemsSource() {
    return [...this.getProductItemsSource() as Product[]];
  }

  updateDeliveryMethodId(id: number) {
    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;

    copyOfSimpleBasket.deliveryMethodId = id;

    this.updateBasketSources(copyOfSimpleBasket);
  }

  private createBasketSourcesIfNull() {
    this.createSimpleBasketIfNull()
    this.createProductItemsIfNull();
  }

  private createSimpleBasketIfNull() {
    if (!this.getSimpleBasketSource()) {
      this.createSimpleBasket();
    }
  }

  private createProductItemsIfNull() {
    if (!this.getProductItemsSource()) {
      this.setProductItemsSource([]);
    }
  }

  updateSimpleBasketAddress(address: Address) {
    const copyOfSimpleBasket = this.copySimpleBasketSource() as SimpleBasket;

    copyOfSimpleBasket.shippingAddress = address;

    this.updateBasketSources(copyOfSimpleBasket);
  }

  incrementExistingItemById(quantity: number, id: number) {
    this.editExistingItemQuantityById(quantity, id);
  }

  decrementExistingItemById(quantity: number, id: number) {
    this.editExistingItemQuantityById(-quantity, id);
  }

  editExistingItemQuantityById(quantity: number, id: number) {
    const copyOfSimpleBasket = this.copySimpleBasketSource();
    const copyOfExistingItem = copyOfSimpleBasket.items.find(item => item.productId === id) as SimpleBasketItem;

    if (copyOfExistingItem.quantity + quantity > MAX_QUANTITY) {
      copyOfExistingItem.quantity = MAX_QUANTITY;
    } else if (copyOfExistingItem.quantity + quantity < 1) {
      copyOfExistingItem.quantity = 1;
    } else {
      copyOfExistingItem.quantity += quantity;
    }

    this.updateBasketSourcesAndRecalculate(copyOfSimpleBasket);
  }

  updateShippingFee(shippingFee: number) {
    this.getTotalsSource()!.shipping = shippingFee;
  }

  updateBasketSources(simpleBasket: SimpleBasket) {
    this.httpClient.post<SimpleBasket>(ApiUrl.BASKET, simpleBasket)
      .subscribe({
        next: updatedSimpleBasket => this.setSimpleBasketSource(updatedSimpleBasket),
        error: err => console.log(err)
      });
  }

  createOrUpdatePaymentIntent() {
    return this.httpClient.post<SimpleBasket>(`${ApiUrl.PAYMENTS}/${this.getSimpleBasketSource()!.id}`, null)
  }

}

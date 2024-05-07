import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {BasketTotals, SimpleBasket, SimpleBasketItem} from "../shared/models/simple-basket";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Product} from "../shared/models/product";
import {ShopService} from "../shop/shop.service";
import {ApiUrl} from "../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketUrl: string = environment.apiUrl + environment.basketPath;
  // Simple basket for Redis
  private simpleBasketSource = new BehaviorSubject<SimpleBasket | null>(null);
  simpleBasketSource$ = this.simpleBasketSource.asObservable();
  private simpleBasketBackup: SimpleBasket | null = null;
  // Basket Items
  private basketItemsSource = new BehaviorSubject<Product[] | null>(null);
  basketItemsSource$ = this.basketItemsSource.asObservable();
  // The basket's subtotals
  private subtotalsSource = new BehaviorSubject<BasketTotals | null>(null);
  subtotalsSource$ = this.subtotalsSource.asObservable();

  constructor(private httpClient: HttpClient, private toastr: ToastrService, private shopService: ShopService) {
  }

  addItemToBasket(product: Product, quantity: number = 1): void {
    let basket = this.simpleBasketSource.getValue();

    if (basket == null) {
      basket = this.createBasket();
    }
    this.simpleBasketBackup = basket;

    const existingItem = basket.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item = new SimpleBasketItem(product.id, quantity);
      basket.items.unshift(item);
      //
      if (!this.getBasketItemsSource()) {
        this.setBasketItemsSource([]);
      }
      this.getBasketItemsSource()!.unshift(product);
    }

    this.updateBasket();
  }

  updateBasket(): void {
    this.httpClient.post<SimpleBasket>(this.basketUrl, this.simpleBasketSource.getValue())
      .subscribe({
        next: updatedBasket => {
          if (updatedBasket == null) {
            this.toastr.error('The item is not added to the cart', '500 – Server Error');
            this.rollBackBasket();
          }
          this.calculateSubTotal();
        },
        error: err => console.log(err)
      });
  }

  removeItemByIndex(index: number): void {
    const simpleBasket = this.getSimpleBasketSource();
    const basketItems = this.basketItemsSource.getValue();

    if (simpleBasket && basketItems) {
      simpleBasket.items.splice(index, 1);
      basketItems.splice(index, 1);
      this.updateBasket();
    }
  }

  getSimpleBasketSource() {
    return this.simpleBasketSource.getValue();
  }

  getBasketItemsSource() {
    return this.basketItemsSource.getValue();
  }

  loadBasket(id: string): void {
    this.httpClient.get<SimpleBasket>(this.basketUrl + id)
      .subscribe({
        next: simpleBasket => {
          if (simpleBasket) {
            this.setSimpleBasketSource(simpleBasket);
          }
          if (this.simpleBasketSource.value) {
            this.loadBasketProducts();
          }
        },
        error: err => console.log(err)
      });
  }

  loadBasketProducts() {
    const simpleBasketItems = this.getSimpleBasketSource()?.items;

    if (simpleBasketItems) {
      const productIds = simpleBasketItems.map(item => item.productId);

      if (productIds.length > 0) {
        this.shopService.getProductsByIds(productIds)
          .subscribe({
            next: products => {
              this.basketItemsSource.next(products.data);
              this.calculateSubTotal();
            },
            error: err => console.log(err)
          });
      } else {
        this.basketItemsSource.next([]);
      }
    }
  }

  deleteBasket() {
    const basketId = this.getSimpleBasketSource()?.id;
    const localBasket = localStorage.getItem(environment.basketId);
    const simpleBasket = this.getSimpleBasketSource();
    const basketItems = this.getBasketItemsSource();

    if (basketId) {
      this.httpClient.delete(ApiUrl.basket + basketId);
    }
    if (localBasket) {
      localStorage.removeItem(environment.basketId);
    }
    if (simpleBasket) {
      this.setSimpleBasketSource(null);
    }
    if (basketItems) {
      this.setBasketItemsSource(null);
    }
  }

  calculateSubTotal(): void {
    const simpleBasket = this.simpleBasketSource.getValue();
    const basketItems = this.basketItemsSource.getValue();

    if (simpleBasket && basketItems) {
      let subtotal = 0;
      for (let i = 0; i < basketItems.length; i++) {
        subtotal += simpleBasket.items[i].quantity * basketItems[i].price;
      }
      this.setSubTotalsSource(new BasketTotals(subtotal));
    }
  }

  private setSimpleBasketSource(basket: SimpleBasket | null) {
    this.simpleBasketSource.next(basket);
  }

  private setBasketItemsSource(value: Product[] | null) {
    this.basketItemsSource.next([]);
  }

  getSubTotalsSource() {
    return this.subtotalsSource.value;
  }

  private setSubTotalsSource(subTotals: BasketTotals) {
    this.subtotalsSource.next(subTotals);
  }

  private createBasket(): SimpleBasket {
    const newBasket: SimpleBasket = new SimpleBasket();

    this.setSimpleBasketSource(newBasket);
    localStorage.setItem(environment.basketId, newBasket.id);

    return newBasket;
  }

  private rollBackBasket(): void {
    this.setSimpleBasketSource(this.simpleBasketBackup);
  }

}

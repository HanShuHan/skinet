import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {BasketSubtotals, SimpleBasket, SimpleBasketItem} from "../shared/models/simpleBasket";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Product} from "../shared/models/product";
import {ShopService} from "../shop/shop.service";

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
  private subtotalsSource = new BehaviorSubject<BasketSubtotals | null>(null);
  subtotalsSource$ = this.subtotalsSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService, private shopService: ShopService) {
    const basketId = localStorage.getItem(environment.basketId);

    if (basketId != null) {
      this.getSimpleBasket(basketId);
    }
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
      this.basketItemsSource.getValue()?.unshift(product);
    }

    this.updateBasket();
  }

  public updateBasket(): void {
    this.http.post<SimpleBasket>(this.basketUrl, this.simpleBasketSource.getValue())
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

  public removeItemByIndex(index: number): void {
    const simpleBasket = this.simpleBasketSource.getValue();
    const basketItems = this.basketItemsSource.getValue();

    if (simpleBasket && basketItems) {
      simpleBasket.items.splice(index, 1);
      basketItems.splice(index, 1);
      this.updateBasket();
    }
  }

  private getSimpleBasket(id: string): void {
    this.http.get<SimpleBasket>(this.basketUrl + id)
      .subscribe({
        next: simpleBasket => {
          this.setSimpleBasketSource(simpleBasket);
        },
        error: err => console.log(err)
      });
  }

  public getBasketProducts() {
    const productIds = this.simpleBasketSource.getValue()!.items
      .map(item => item.productId);
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

  private calculateSubTotal(): void {
    const simpleBasket = this.simpleBasketSource.getValue();
    const basketItems = this.basketItemsSource.getValue();

    if (simpleBasket && basketItems) {
      let subtotal = 0;
      for (let i = 0; i < basketItems.length; i++) {
        subtotal += simpleBasket.items[i].quantity * basketItems[i].price;
      }
      this.setSubTotalsSource(new BasketSubtotals(subtotal));
    }
  }

  private setSimpleBasketSource(basket: SimpleBasket | null) {
    this.simpleBasketSource.next(basket);
  }

  private setSubTotalsSource(subTotals: BasketSubtotals) {
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

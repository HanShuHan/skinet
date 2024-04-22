import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Basket, BasketItem, BasketSubtotals} from "../shared/models/basket";
import {environment} from "../../environments/environment";
import {Product} from "../shared/models/product";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketUrl: string = environment.apiUrl + environment.basketPath;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private recordedBasket: Basket | null = null;
  private subtotalsSource = new BehaviorSubject<BasketSubtotals | null>(null);
  subtotalsSource$ = this.subtotalsSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {
    const basketId = localStorage.getItem(environment.basketId);

    if (basketId != null) {
      this.getBasket(basketId);
    }
  }

  addItemToBasket(product: Product, quantity: number = 1): void {
    let basket = this.getBasketSource();

    if (basket == null) {
      basket = this.createBasket();
    }
    this.recordedBasket = basket;

    const existingItem = basket.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const item = new BasketItem(product, quantity);
      basket.items.push(item);
    }

    this.updateBasket();
  }

  public updateBasket(): void {
    this.http.post<Basket>(this.basketUrl, this.getBasketSource())
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

  public removeItem(item: BasketItem): void {
    const basket = this.getBasketSource();

    if (basket) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      this.updateBasket();
    }
  }

  private getBasket(id: string): void {
    this.http.get<Basket>(this.basketUrl + id)
      .subscribe({
        next: basket => {
          this.setBasketSource(basket);
          this.calculateSubTotal();
        },
        error: err => console.log(err)
      });
  }

  private getBasketSource() {
    return this.basketSource.getValue();
  }

  private calculateSubTotal(): void {
    const basket = this.getBasketSource();

    if (basket) {
      const subTotal = basket.items.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0);
      this.setSubTotalsSource(new BasketSubtotals(subTotal));
    }
  }

  private setBasketSource(basket: Basket | null) {
    this.basketSource.next(basket);
  }

  private setSubTotalsSource(subTotals: BasketSubtotals) {
    this.subtotalsSource.next(subTotals);
  }

  private createBasket(): Basket {
    const newBasket: Basket = new Basket();

    this.setBasketSource(newBasket);
    localStorage.setItem(environment.basketId, newBasket.id);

    return newBasket;
  }

  private rollBackBasket(): void {
    this.setBasketSource(this.recordedBasket);
  }

}

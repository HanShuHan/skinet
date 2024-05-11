import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Order} from "../shared/models/order";
import {ApiUrl} from "../../constants/api.constants";
import {AccountService} from "../account/account.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersSource = new BehaviorSubject<Order[] | null>(null);
  ordersSource$ = this.ordersSource.asObservable();

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
  }

  loadOrders() {
    const currentUser = this.accountService.getCurrentUser();
    if (currentUser) {
      this.getUserOrders();
    }
  }

  private getUserOrders() {
    this.httpClient.get<Order[]>(ApiUrl.ORDERS)
      .subscribe({
        next: orders => this.setOrdersSource(orders),
        error: err => console.log(err)
      });
  }

  getUserOrderByOrderId(id: number) {
    return this.httpClient.get<Order>(ApiUrl.ORDERS + '/' + id);
  }

  private setOrdersSource(orders: Order[]) {
    this.ordersSource.next(orders);
  }
}

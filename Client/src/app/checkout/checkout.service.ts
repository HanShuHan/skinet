import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryMethod, Order, OrderToCreate} from "../shared/models/order";
import {ApiUrl, Path} from "../../constants/api.constants";
import {BasketService} from "../basket/basket.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SimpleBasket} from "../shared/models/SimpleBasket";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient, private basketService: BasketService, private router: Router, private toastrService: ToastrService) {
  }

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.httpClient.get<DeliveryMethod[]>(ApiUrl.DELIVERY_METHODS);
  }

  createOrder() {
    const simpleBasket = this.basketService.getSimpleBasketSource() as SimpleBasket;
    const orderDto = new OrderToCreate(simpleBasket.id, simpleBasket.shippingAddress!, simpleBasket.deliveryMethodId!);

    this.httpClient.post<Order>(ApiUrl.ORDERS, orderDto)
      .subscribe({
        next: order => {
          this.basketService.deleteBasket();
          this.toastrService.success(`order id: ${order.id}`, 'A New Order Created');
          this.router.navigate([Path.CHECKOUT_SUCCESS], {queryParams: {orderId: order.id}}).then();
        },
        error: err => console.log(err)
      });
  }
}

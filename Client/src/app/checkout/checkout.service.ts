import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeliveryMethod, Order, OrderToCreate} from "../shared/models/order";
import {ApiPath, ApiUrl} from "../../constants/api.constants";
import {BasketService} from "../basket/basket.service";
import {Address} from "../shared/models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient, private basketService: BasketService, private router: Router, private toastrService: ToastrService) {
  }

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.httpClient.get<DeliveryMethod[]>(ApiUrl.deliveryMethods);
  }

  createOrder(basketId: string, address: Address, deliveryMethodId: number) {
    const orderDto = new OrderToCreate(basketId, address, deliveryMethodId);

    this.httpClient.post<Order>(ApiUrl.orders, orderDto)
      .subscribe({
        next: order => {
          this.basketService.deleteBasket();
          this.toastrService.success(`order id: ${order.id}`, 'A New Order Created');
          this.router.navigateByUrl(ApiPath.checkoutOrder).then();
        },
        error: err => console.log(err)
      });
  }
}

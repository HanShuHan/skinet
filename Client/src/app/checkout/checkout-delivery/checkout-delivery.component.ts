import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DeliveryMethod} from "../../shared/models/order";
import {BasketService} from "../../basket/basket.service";
import {CheckoutService} from "../checkout.service";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['../checkout.component.scss', './checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() deliveryForm?: FormGroup;
  deliveryMethods?: DeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods()
      .subscribe({
        next: deliveryMethods => this.deliveryMethods = deliveryMethods,
        error: err => console.log(err)
      })
  }

  protected selectShippingMethod(id: number) {
    const subtotal = this.basketService.getSubTotalsSource();
    if (subtotal) {
      subtotal.shipping = this.deliveryMethods?.find(dm => dm.id === id)?.price;
    }
  }
}

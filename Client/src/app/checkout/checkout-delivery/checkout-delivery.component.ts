import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DeliveryMethod} from "../../shared/models/order";
import {BasketService} from "../../basket/basket.service";
import {CheckoutService} from "../checkout.service";
import {take} from "rxjs";

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
    this.loadDeliveryMethods();
    this.setDefaultMethodId();
  }

  private loadDeliveryMethods() {
    this.checkoutService.getDeliveryMethods()
      .subscribe({
        next: deliveryMethods => this.deliveryMethods = deliveryMethods,
        error: err => console.log(err)
      })
  }

  private setDefaultMethodId() {
    this.basketService.simpleBasketSource$
      .pipe(
        take(1)
      ).subscribe({
      next: simpleBasket => {
        if (simpleBasket?.deliveryMethodId) {
          this.deliveryForm?.controls['deliveryMethod']?.patchValue(simpleBasket.deliveryMethodId.toString());
        }
      }
    })
  }

  protected selectDeliveryMethod(id: number) {
    const shippingFee = this.deliveryMethods!.find(deliveryMethod => deliveryMethod.id === id)!.price;

    this.basketService.updateDeliveryMethodId(id);
    this.basketService.updateShippingFee(shippingFee);
  }

}

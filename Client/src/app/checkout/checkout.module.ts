import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {SharedModule} from "../shared/shared.module";
import {CheckoutDeliveryComponent} from './checkout-delivery/checkout-delivery.component';
import {CheckoutReviewComponent} from './checkout-review/checkout-review.component';
import {CheckoutPaymentComponent} from './checkout-payment/checkout-payment.component';
import {CheckoutAddressComponent} from './checkout-address/checkout-address.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BasketModule} from "../basket/basket.module";
import { CheckoutOrderComponent } from './checkout-order/checkout-order.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
    CheckoutAddressComponent,
    CheckoutOrderComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BasketModule,
  ]
})
export class CheckoutModule {
}

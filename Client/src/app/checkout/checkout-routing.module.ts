import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from "./checkout.component";
import {CheckoutOrderComponent} from "./checkout-order/checkout-order.component";

const routes: Routes = [
  {path: '', component: CheckoutComponent},
  {path: 'order', component: CheckoutOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}

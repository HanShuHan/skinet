import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from "./checkout.component";
import {CheckoutOrderComponent} from "./checkout-order/checkout-order.component";
import {Route} from "../../constants/api.constants";

const routes: Routes = [
  {path: '', component: CheckoutComponent},
  {path: Route.SUCCESS, component: CheckoutOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}

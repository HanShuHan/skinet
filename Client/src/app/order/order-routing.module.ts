import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";
import {HasOrderGuard} from "../core/guard/has-order.guard";

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: ':id', canActivate: [HasOrderGuard], component: OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

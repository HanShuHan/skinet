import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from "./order.component";
import {OrderDetailsComponent} from './order-details/order-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [OrderComponent, OrderDetailsComponent, OrderSummaryComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        SharedModule,
        NgOptimizedImage
    ]
})
export class OrderModule { }

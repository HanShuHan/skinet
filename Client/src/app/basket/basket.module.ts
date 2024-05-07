import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BasketRoutingModule} from './basket-routing.module';
import {BasketComponent} from './basket.component';
import {BasketSummaryComponent} from './basket-summary/basket-summary.component';
import { BasketTotalsComponent } from './basket-totals/basket-totals.component';


@NgModule({
  declarations: [
    BasketComponent,
    BasketSummaryComponent,
    BasketTotalsComponent,
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    NgOptimizedImage,
  ],
  exports: [
    BasketSummaryComponent,
    BasketTotalsComponent
  ]
})
export class BasketModule {
}

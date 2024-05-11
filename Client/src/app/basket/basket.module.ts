import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BasketRoutingModule} from './basket-routing.module';
import {BasketComponent} from './basket.component';
import {BasketSummaryComponent} from './basket-summary/basket-summary.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    BasketComponent,
    BasketSummaryComponent,
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  exports: [
    BasketSummaryComponent,
  ]
})
export class BasketModule {
}

import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {BasketRoutingModule} from './basket-routing.module';
import {BasketComponent} from './basket.component';


@NgModule({
  declarations: [
    BasketComponent,
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    NgOptimizedImage
  ]
})
export class BasketModule {
}

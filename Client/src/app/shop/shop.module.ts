import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ShopComponent} from './shop.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShopRoutingModule} from "./shop-routing.module";


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ShopRoutingModule,
    NgOptimizedImage,
  ]
})
export class ShopModule {
}

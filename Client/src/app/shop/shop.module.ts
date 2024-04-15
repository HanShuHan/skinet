import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from './shop.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductItemComponent} from './product-item/product-item.component';
import {SharedModule} from "../shared/shared.module";
import {ProductSearchBarComponent} from "./product-search-bar/product-search-bar.component";
import { ProductSearchSideBarComponent } from './product-search-side-bar/product-search-side-bar.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductSearchBarComponent,
    ProductSearchSideBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }

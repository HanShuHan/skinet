import {NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {NgOptimizedImage} from "@angular/common";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {NO_ERRORS_SCHEMA} from "@angular/compiler";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CarouselModule,
    NgOptimizedImage
  ],
  exports: [
    HomeComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class HomeModule {
}

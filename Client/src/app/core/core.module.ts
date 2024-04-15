import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }

import {NgModule} from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";


@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule {
}

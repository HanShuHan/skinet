import {NgModule} from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TestErrorComponent} from './test-error/test-error.component';
import {ErrorComponent} from './error/error.component';
import {ToastrModule} from "ngx-toastr";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    ErrorComponent,
  ],
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    ToastrModule.forRoot(environment.toastrConfig),
    NgIf,
    NgForOf
  ],
  exports: [
    NavBarComponent,
  ]
})
export class CoreModule {
}

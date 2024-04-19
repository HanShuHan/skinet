import {NgModule} from '@angular/core';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TestErrorComponent} from './test-error/test-error.component';
import {ErrorComponent} from './error/error.component';
import {ToastrModule} from "ngx-toastr";
import {environment} from "../../environments/environment";
import { SectionHeaderComponent } from './section-header/section-header.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    NavBarComponent,
    TestErrorComponent,
    ErrorComponent,
    SectionHeaderComponent,
  ],
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    ToastrModule.forRoot(environment.toastrConfig),
    NgIf,
    NgForOf,
    BreadcrumbModule,
    UpperCasePipe,
    AsyncPipe,
    TitleCasePipe,
    NgxSpinnerModule.forRoot()
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent,
    NgxSpinnerModule
  ]
})
export class CoreModule {
}

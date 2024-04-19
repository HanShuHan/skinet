import {NgModule} from '@angular/core';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PagingHeaderComponent} from './paging-header/paging-header.component';
import {NgIf} from "@angular/common";
import {PagerComponent} from './pager/pager.component';
import {FormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-bootstrap/carousel";


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    NgIf,
    FormsModule,
    CarouselModule.forRoot()
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule
  ]
})
export class SharedModule {
}

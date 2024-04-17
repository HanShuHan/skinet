import {NgModule} from '@angular/core';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PagingHeaderComponent} from './paging-header/paging-header.component';
import {NgIf} from "@angular/common";
import {PagerComponent} from './pager/pager.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    NgIf,
    FormsModule
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent
  ]
})
export class SharedModule {
}

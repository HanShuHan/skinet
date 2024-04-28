import {NgModule} from '@angular/core';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PagingHeaderComponent} from './paging-header/paging-header.component';
import {JsonPipe, LowerCasePipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {PagerComponent} from './pager/pager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {InputTextComponent} from './input-text/input-text.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    InputTextComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    NgIf,
    FormsModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    NgClass,
    LowerCasePipe,
    JsonPipe,
    TitleCasePipe,
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    InputTextComponent,
    CarouselModule,
  ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PagingHeaderComponent} from './components/paging-header/paging-header.component';
import {
  JsonPipe,
  LowerCasePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
  TitleCasePipe,
  UpperCasePipe
} from "@angular/common";
import {PagerComponent} from './components/pager/pager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {InputTextComponent} from './components/input-text/input-text.component';
import {StepperComponent} from './components/stepper/stepper.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    InputTextComponent,
    StepperComponent,
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
    NgForOf,
    NgTemplateOutlet,
    CdkStepperModule,
    RouterLink,
    UpperCasePipe
  ],
  exports: [
    PagerComponent,
    InputTextComponent,
    StepperComponent,
    PagingHeaderComponent,
    CarouselModule,
    CdkStepperModule
  ]
})
export class SharedModule {
}

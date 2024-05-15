import {NgModule} from '@angular/core';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {PagingHeaderComponent} from './components/paging-header/paging-header.component';
import {
  CurrencyPipe, DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  NgClass,
  NgForOf,
  NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault,
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
import {OrderTotalsComponent} from "./components/order-totals/order-totals.component";


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    InputTextComponent,
    StepperComponent,
    OrderTotalsComponent
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
    UpperCasePipe,
    CurrencyPipe,
    DecimalPipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  exports: [
    PagerComponent,
    InputTextComponent,
    StepperComponent,
    PagingHeaderComponent,
    CarouselModule,
    CdkStepperModule,
    OrderTotalsComponent
  ]
})
export class SharedModule {
}

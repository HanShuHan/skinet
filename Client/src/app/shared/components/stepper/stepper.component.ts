import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {CdkStepper} from "@angular/cdk/stepper";
import {Directionality} from "@angular/cdk/bidi";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {

  @Input() prevPageUrl?: string;
  // @Input() nextPageUrl?: string;
  @Input() firstStepPrevButtonLabel?: string;
  @Input() lastStepNextButtonLabel?: string;
  @Input() submitForm?: any;

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>, protected router: Router) {
    super(dir, changeDetectorRef, elementRef);
  }

  ngOnInit(): void {
    this.linear = true;
  }

  protected selectStep(i: number) {
    this.selectedIndex = i;
  }

  createOrUpdatePayment() {
    // this.
  }

}

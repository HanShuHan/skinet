import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {Path, Route} from "../../constants/api.constants";
import {CheckoutService} from "./checkout.service";
import {BasketService} from "../basket/basket.service";
import {Address} from "../shared/models/user";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  protected readonly Path = Path;
  protected readonly Route = Route;
  protected isReviewed: boolean = false;
  checkoutForm = this.formBuilder.group({
    addressForm: this.formBuilder.group({
      street: ['', [Validators.required, Validators.maxLength(256)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zipCode: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      country: ['', [Validators.required, Validators.maxLength(50)]]
    }),
    deliveryForm: this.formBuilder.group({
      deliveryMethod: ['', [Validators.required]]
    }),
    paymentForm: this.formBuilder.group({
      creditCardOwnerName: ['', [Validators.required]]
    })
  });
  protected addressForm = this.checkoutForm.controls['addressForm'];
  protected deliveryForm = this.checkoutForm.controls['deliveryForm'];

  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService, protected basketService: BasketService) {
  }

  ngOnInit(): void {
    this.basketService.calculateTotals();
  }

  onSelectionChanged($event: StepperSelectionEvent) {
    this.updateSimpleBasketAddress($event);
    this.checkIsStep3Reviewed($event);
  }

  private updateSimpleBasketAddress($event: StepperSelectionEvent) {
    if ($event.previouslySelectedIndex === 0) {
      this.basketService.updateSimpleBasketAddress(this.addressForm.value as Address);
    }
  }

  private checkIsStep3Reviewed($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 2 && !this.isReviewed) {
      this.isReviewed = true;
    }
  }

  get createOrder() {
    return () => {
      this.basketService.createOrUpdatePaymentIntent()
        .subscribe({
          next: () => this.checkoutService.createOrder(),
          error: err => console.log(err)
        });
    };
  }

}

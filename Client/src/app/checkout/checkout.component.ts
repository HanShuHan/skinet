import {Component} from '@angular/core';
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
export class CheckoutComponent {

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

  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService, protected basketService: BasketService) {
  }

  onSelectionChanged($event: StepperSelectionEvent) {
    this.updateSimpleBasketAddress($event);
    this.checkIsStep3Reviewed($event);
  }

  private updateSimpleBasketAddress($event: StepperSelectionEvent) {
    if ($event.previouslySelectedIndex === 0) {
      this.basketService.updateSimpleBasketAddress(this.checkoutForm.controls["addressForm"].value as Address);
    }
  }

  private checkIsStep3Reviewed($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 2 && !this.isReviewed) {
      this.isReviewed = true;
    }
  }

  get createOrder() {
    return () => {
      const basketId = this.basketService.getSimpleBasketSource()?.id;
      const address = this.checkoutForm.controls['addressForm'].value as Address;
      const deliveryMethodId = parseInt(this.checkoutForm.controls['deliveryForm'].controls['deliveryMethod'].value as string);

      if (basketId && this.checkoutForm.controls['addressForm'].valid && deliveryMethodId) {
        this.checkoutService.createOrder(basketId, address, deliveryMethodId);
      }
    };
  }

}

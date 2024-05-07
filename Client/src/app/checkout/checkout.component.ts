import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {ApiUrl} from "../../constants/api.constants";
import {UrlHelper} from "../shared/helpers/url-helper";
import {CheckoutService} from "./checkout.service";
import {BasketService} from "../basket/basket.service";
import {Address} from "../shared/models/user";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

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

  protected isReviewed: boolean = false;
  basketPath: string = '/' + UrlHelper.lastPathname(ApiUrl.basket);
  shopPath: string = '/' + UrlHelper.lastPathname(ApiUrl.shop);

  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService, private basketService: BasketService) {
  }

  onSelectionChanged($event: StepperSelectionEvent) {
    if (!this.isReviewed && $event.selectedIndex === 2) {
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

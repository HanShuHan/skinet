import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {ToastrService} from "ngx-toastr";
import {Address} from "../../shared/models/user";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['../checkout.component.scss', './checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() addressForm?: FormGroup;
  protected addressLoaded?: Address;

  constructor(private accountService: AccountService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.loadUserAddress();
  }

  private loadUserAddress() {
    const user = this.accountService.getCurrentUser();
    if (user?.address) {
      this.addressLoaded = user.address;
      this.addressForm?.patchValue(user.address);
    }
  }

  protected saveAddress() {
    if (this.addressForm?.valid && this.addressChanged()) {
      this.accountService.updateAddress(this.addressForm?.value)
        .subscribe({
          next: address => {
            if (address) {
              this.addressLoaded = address;
              this.accountService.getCurrentUser()!.address = address;
              this.toastrService.success('', 'Address Update Success');
            }
          }
        })
    }
  }

  protected addressChanged() {
    return JSON.stringify(this.addressLoaded) != JSON.stringify(this.addressForm?.value);
  }

  protected addressNotChanged() {
    return !this.addressChanged();
  }

  protected restoreAddress() {
    if (this.addressLoaded) {
      this.addressForm?.patchValue(this.addressLoaded);
    } else {
      this.addressForm?.reset();
    }
  }

  protected clearForm() {
    this.addressForm?.reset();
  }

}

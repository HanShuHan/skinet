import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {ToastrService} from "ngx-toastr";
import {Address} from "../../shared/models/user";
import {BasketService} from "../../basket/basket.service";
import {BehaviorSubject, take} from "rxjs";
import {IsEqual} from "../../shared/helpers/object-helper";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['../checkout.component.scss', './checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {

  @Input() addressForm?: FormGroup;
  protected addressToBeRestored: Address = Address.empty();
  protected isUpdatableSource = new BehaviorSubject<boolean | null>(null);
  protected isUpdatableSource$ = this.isUpdatableSource.asObservable();
  @ViewChild('updateButton') private updateButton?: ElementRef;

  constructor(private accountService: AccountService, private toastrService: ToastrService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.loadUserAddress();
    this.setupIsUpdatableOnInit();
    this.setupIsUpdatableOnFormChanges();
  }

  private loadUserAddress() {
    let address: Address | undefined;

    this.basketService.simpleBasketSource$
      .pipe(
        take(1)
      ).subscribe({
      next: simpleBasket => {
        if (simpleBasket?.shippingAddress) {
          address = simpleBasket.shippingAddress;
        }
      }
    });
    this.accountService.userSource$
      .pipe(
        take(1)
      ).subscribe({
      next: user => {
        if (!address && user?.address) {
          address = user.address;
        }
      }
    });

    if (address) {
      this.addressForm?.patchValue(address);
      this.addressToBeRestored = address;
    }
  }

  private setupIsUpdatableOnInit() {
    this.accountService.userSource$
      .pipe(
        take(1)
      ).subscribe({
      next: user => this.setIsUpdatableSource(
        (!!this.addressForm?.valid) // form is valid
        && (!!user?.address) // the user has address
        && !IsEqual(this.addressForm.value, user.address)) // two addresses are not equal
    });
  }

  private setupIsUpdatableOnFormChanges() {
    this.addressForm?.valueChanges
      .subscribe({
        next: () => this.setupIsUpdatableOnInit()
      })
  }

  private setIsUpdatableSource(updatable: boolean | null) {
    this.isUpdatableSource.next(updatable);
  }

  protected saveAddress() {
    if (this.isUpdatableSource.value) {
      this.updateUserAddress();
    }
  }

  private updateUserAddress() {
    if (this.addressForm?.value) {
      this.accountService.updateAddress(this.addressForm.value)
        .pipe(
          take(1)
        ).subscribe({
          next: address => {
            if (address) {
              this.reloadUser();
              this.addressToBeRestored = address;
              // disable the update button
              if (this.updateButton) {
                this.updateButton.nativeElement.disabled = true;
              }
              this.toastrService.success('', 'Address Update Success');
            }
          },
          error: err => console.log(err)
        });
    }
  }

  private reloadUser() {
    this.accountService.userSource$
      .pipe(
        take(1)
      ).subscribe({
        next: user => {
          const token = user?.token;
          if (token) {
            this.accountService.loadUserByToken(token);
          }
        }
      })
  }

  protected restoreAddress() {
    this.addressForm?.patchValue(this.addressToBeRestored);
  }

  protected clearForm() {
    this.addressForm?.reset();
  }

}

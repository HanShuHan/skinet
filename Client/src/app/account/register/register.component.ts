import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {debounceTime, map, switchMap, take} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  readonly passwordErrorMessage: string = 'Password should be at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and the length should be between 6-10 characters';
  readonly phoneNumberErrorMessage: string = "Phone number should be the pattern of '(111) 222-3333' or '1112223333' or '111'-222-3333'";
  protected errors?: any[];
  protected registerForm: FormGroup = this.formBuilder.group<any>({
    email: ['', [Validators.required, Validators.email], this.emailNotInUseAsyncValidator],
    password: ['', [Validators.required, Validators.pattern(environment.passwordPattern)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(environment.phoneNumberPattern)]],
    displayName: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.errors = this.router.getCurrentNavigation()?.extras?.state?.['error']?.errors;
  }

  protected register() {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value)
        .subscribe({
          next: user => {
            this.accountService.updateUser(user);
            this.router.navigateByUrl('/shop').then();
          },
          error: err => this.errors = err.errors
        });
    }
  }

  private get emailNotInUseAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(
          debounceTime(650),
          take(1),
          switchMap(() => {
            return this.accountService.checkEmailNotInUse(control.value)
              .pipe(
                map(emailNotInUse => {
                  return emailNotInUse ? null : {emailInUse: !emailNotInUse};
                })
              );
          })
        )
    }
  }

}

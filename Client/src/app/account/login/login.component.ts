import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected loginForm: FormGroup = this.formBuilder.group<any>({
    userName: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(environment.passwordPattern)]]
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  protected login() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value)
        .subscribe({
          next: () => {
            this.navigate();
          },
          error: err => console.log(err)
        });
    }
  }

  private navigate() {
    const returnUrl = this.activatedRoute.snapshot.queryParams?.['returnUrl'];
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl).then();
    } else {
      this.router.navigateByUrl('/shop').then();
    }
  }

}

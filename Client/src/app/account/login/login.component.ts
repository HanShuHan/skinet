import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Path} from "../../../constants/api.constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected loginForm: FormGroup = this.formBuilder.group<any>({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  protected error?: any;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  protected login() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value)
        .subscribe({
          next: () => {
            this.navigate();
          },
          error: err => this.error = err
        });
    }
  }

  private navigate() {
    const returnUrl = this.activatedRoute.snapshot.queryParams?.['returnUrl'];
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl).then();
    } else {
      this.router.navigateByUrl(Path.SHOP).then();
    }
  }

}

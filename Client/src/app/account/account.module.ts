import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountProfileComponent} from './account-profile/account-profile.component';
import {SharedModule} from "../shared/shared.module";
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AccountProfileComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {Route} from "../../constants/api.constants";
import {NoAuthGuard} from "../core/guard/no-auth-guard.service";
import {AccountProfileComponent} from "./account-profile/account-profile.component";
import {AuthGuard} from "../core/guard/auth.guard";
import {AccountComponent} from "./account.component";

const routes: Routes = [
  {path: '', component: AccountComponent},
  {path: Route.REGISTER, canActivate: [NoAuthGuard], component: RegisterComponent},
  {path: Route.LOGIN, canActivate: [NoAuthGuard], component: LoginComponent},
  {path: Route.PROFILE, canActivate: [AuthGuard], component: AccountProfileComponent, data: {breadcrumb: {alias: 'account-profile'}}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}

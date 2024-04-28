import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TestErrorComponent} from "./core/test-error/test-error.component";
import {ErrorComponent} from "./core/error/error.component";
import {environment} from "../environments/environment";
import {AccountModule} from "./account/account.module";
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: environment.home}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(provider => provider.ShopModule)},
  {path: 'basket', loadChildren: () => import('./basket/basket.module').then(provider => provider.BasketModule)},
  {path: 'checkout', canActivate: [AuthGuard], loadChildren: () => import('./checkout/checkout.module').then(provider => provider.CheckoutModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(provider => provider.AccountModule)},
  {
    path: 'error', children: [
      {path: '', component: TestErrorComponent},
      {path: ':statusCode', component: ErrorComponent},
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

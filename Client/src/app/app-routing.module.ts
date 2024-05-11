import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TestErrorComponent} from "./core/test-error/test-error.component";
import {ErrorComponent} from "./core/error/error.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {CheckoutGuard} from "./core/guard/checkout.guard";
import {Route} from "../constants/api.constants";

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: Route.SHOP, loadChildren: () => import('./shop/shop.module').then(p => p.ShopModule)},
  {path: Route.BASKET, loadChildren: () => import('./basket/basket.module').then(p => p.BasketModule)},
  {
    path: Route.CHECKOUT,
    canActivate: [AuthGuard, CheckoutGuard],
    loadChildren: () => import('./checkout/checkout.module').then(p => p.CheckoutModule)
  },
  {path: Route.ORDERS, canActivate: [AuthGuard], loadChildren: () => import('./order/order.module').then(p => p.OrderModule)},
  {path: Route.ACCOUNT, loadChildren: () => import('./account/account.module').then(p => p.AccountModule)},
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

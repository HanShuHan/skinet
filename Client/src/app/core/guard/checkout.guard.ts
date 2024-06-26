import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {BasketService} from "../../basket/basket.service";
import {Path, Route} from "../../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private basketService: BasketService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.basketService.productItemsSource$
      .pipe(
        map(basketItems => {
            if (basketItems && basketItems.length > 0) {
              return true;
            } else {
              this.router.navigateByUrl('/shop').then();
              return false;
            }
          }
        )
      );
  }

}

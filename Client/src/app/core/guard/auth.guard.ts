import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AccountService} from "../../account/account.service";
import {Path} from "../../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.accountService.userSource$
      .pipe(
        take(1),
        map(user => {
          if (user) {
            return true;
          } else {
            const queryParams = {returnUrl: state.url};
            this.router.navigate([Path.LOGIN], {queryParams}).then();
            return false;
          }
        }),
      )
  }

}

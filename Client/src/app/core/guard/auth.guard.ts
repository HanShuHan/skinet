import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../../account/account.service";
import {environment} from "../../../environments/environment";

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
        map(user => {
          if (user) {
            return true;
          } else {
            const queryParams = {returnUrl: state.url};
            this.router.navigate([environment.accountPath, 'login'], {queryParams}).then();
            return false;
          }
        }),
      )
  }

}

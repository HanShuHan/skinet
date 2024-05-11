import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AccountService} from "../../account/account.service";
import {Path, Route} from "../../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

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
            this.router.navigateByUrl(Path.PROFILE).then();
            return false;
          } else {
            return true;
          }
        })
      );
  }

}

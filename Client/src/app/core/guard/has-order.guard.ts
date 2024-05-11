import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {isPositiveInteger} from "../../shared/helpers/numeric-helper";
import {Path} from "../../../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class HasOrderGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const orderId = route.paramMap.get('id');

    if (isPositiveInteger(orderId)) {
      return true;
    } else{
      this.router.navigateByUrl(Path.ORDERS).then();
      return true;
    }
  }

}

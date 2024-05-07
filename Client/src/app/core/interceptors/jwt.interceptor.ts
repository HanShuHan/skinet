import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {AccountService} from "../../account/account.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private token?: string;

  constructor(private accountService: AccountService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.accountService.userSource$
      .pipe(
        take(1)
      )
      .subscribe({
        next: user => this.token = user?.token
      });

    if (this.token) {
      const jwtRequest = request.clone({
        setHeaders: {Authorization: `Bearer ${this.token}`}
      });
      return next.handle(jwtRequest);
    }

    return next.handle(request);
  }

}

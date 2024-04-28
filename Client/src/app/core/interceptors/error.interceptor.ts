import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {NavigationExtras, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        if (err) {
          const error = err.error;

          if (err.status === 400 && error.errors) {
            throw err.error;
          } else {
            const extras: NavigationExtras = {state: {error: error}};

            this.router.navigateByUrl(`/error/${err.status}`, extras)
              .then(() => this.toastr.error(error.message, error.statusCode));
          }

          return throwError(() => new Error(err.message));
        } else {
          return caught;
        }
      })
    );
  }

}

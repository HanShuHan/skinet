import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusyRequestService} from "../services/busy-request.service";
import {Router} from "@angular/router";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyRequestService, private router: Router) {
  }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   // const shouldDelay = this.router.url === '/shop';
  //
  //   // if (shouldDelay) {
  //   this.busyService.busy();
  //   // }
  //   return next.handle(request).pipe(
  //     // shouldDelay ? delay(500) : delay(0),
  //     // finalize(() => {
  //     //   if (shouldDelay) {
  //     //     this.busyService.idle();
  //     //   }
  //     // })
  //     delay(800),
  //     finalize(() => this.busyService.idle())
  //   );
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }


}

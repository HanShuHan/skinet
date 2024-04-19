import {Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyRequestService {

  private requestCount: number = 0;

  constructor(private spinnerService: NgxSpinnerService) {
  }

  busy():void {
    this.requestCount += 1;
    this.spinnerService.show('loading').then();
  }

  idle(): void {
    this.requestCount -= 1;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
    }

    this.spinnerService.hide('loading').then();
  }

}

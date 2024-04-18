import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ErrorResponse} from "../../shared/models/ErrorResponse";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  error!: ErrorResponse;

  constructor(private router: Router) {
    const error = this.router.getCurrentNavigation()?.extras?.state?.['error'];

    if (error) {
      this.error = error;
    } else {
      this.router.navigateByUrl(environment.apiUrl).then();
    }
  }

}

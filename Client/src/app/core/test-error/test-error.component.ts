import {Component} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {

  private productsUrl: string = environment.apiUrl + environment.productsPath;
  errMessages?: string[] = [];

  constructor(private http: HttpClient) {
  }

  get400BadRequestError() {
    const id = 'ABC';

    this.http.get(this.productsUrl + id).subscribe({
      error: err => {
        console.log(err);
        if (err.errors) {
          this.errMessages = err.errors;
        }
      }
    });
  }

  get404ProductNotFoundError() {
    const id = 999;

    this.http.get(this.productsUrl + id).subscribe({
      error: err => console.log(err)
    });
  }

  get404PageNotFoundError() {
    this.http.get(environment.apiUrl + 'NoSuchService').subscribe({
      error: err => console.log(err)
    });
  }

  get500InternalServerError() {
    this.http.get(environment.apiUrl + 'buggy/servererror').subscribe({
      error: err => console.log(err)
    });
  }

}

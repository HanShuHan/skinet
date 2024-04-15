import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../shared/models/product";
import {Pagination} from "../shared/models/pagination";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  private baseUrl: string = 'https://localhost:5001/api';

  constructor(private http: HttpClient) {
  }

  public getProducts(params?: HttpParams): Observable<Pagination<Product[]>>{
    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}/products`, {params});
  }

}

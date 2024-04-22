import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Brand, Product, Type} from "../shared/models/product";
import {Pagination} from "../shared/models/pagination";
import {Observable} from "rxjs";
import {ProductParams} from "../shared/models/product-params";
import {SORT_OPTIONS} from "./shop.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  private productsUrl: string = environment.apiUrl + environment.productsPath;

  constructor(private http: HttpClient) {
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl + id);
  }

  public getProducts(productParams: ProductParams): Observable<Pagination<Product[]>> {
    const params = this.genHttpParams(productParams);

    return this.http.get<Pagination<Product[]>>(this.productsUrl, {params: params});
  }

  public getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.productsUrl + 'brands');
  }

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.productsUrl + 'types');
  }

  private genHttpParams(productParams: ProductParams): HttpParams {
    let params = new HttpParams();

    if (productParams.brandId > 0) {
      params = params.append('brandId', productParams.brandId);
    }
    if (productParams.typeId > 0) {
      params = params.append('typeId', productParams.typeId);
    }
    if (productParams.searchTerm && productParams.searchTerm.trim().length > 0) {
      params = params.append('search', productParams.searchTerm);
    }
    if (SORT_OPTIONS.some(option => option.value === productParams.sortBy)) {
      params = params.append('sort', productParams.sortBy);
    }
    if (productParams.pageIndex > 0) {
      params = params.append('pageIndex', productParams.pageIndex);
    }
    if (productParams.pageSize > 0) {
      params = params.append('pageSize', productParams.pageSize);
    }

    return params;
  }

}

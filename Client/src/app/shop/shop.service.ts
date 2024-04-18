import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../shared/models/product";
import {Pagination} from "../shared/models/pagination";
import {Observable} from "rxjs";
import {Brand} from "../shared/models/brand";
import {Type} from "../shared/models/type";
import {ProductParams} from "../shared/models/product-params";
import {ShopComponent, SORT_OPTIONS} from "./shop.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  private baseUrl: string = environment.apiUrl + environment.productsUrl;

  constructor(private http: HttpClient) {
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + id);
  }

  public getProducts(productParams: ProductParams): Observable<Pagination<Product[]>> {
    const params = this.genHttpParams(productParams);

    return this.http.get<Pagination<Product[]>>(this.baseUrl, {params: params});
  }

  public getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl + 'brands');
  }

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + 'types');
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

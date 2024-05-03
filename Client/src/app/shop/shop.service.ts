import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product, ProductBrand, ProductType} from "../shared/models/product";
import {Pagination} from "../shared/models/pagination";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductParams} from "../shared/models/product-params";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ShopService {

  private productsUrl: string = environment.apiUrl + environment.productsPath;
  // Product brands and types' source
  private productBrandsSource = new BehaviorSubject<ProductBrand[]>([{id: 0, name: 'All'}]);
  productBrandsSource$ = this.productBrandsSource.asObservable();
  private productTypesSource = new BehaviorSubject<ProductType[]>([{id: 0, name: 'All'}]);
  productTypesSource$ = this.productTypesSource.asObservable();

  constructor(private http: HttpClient) {
  }

  public getProductById(id: number): Observable<Pagination<Product[]>> {
    return this.http.get<Pagination<Product[]>>(this.productsUrl + id);
  }

  public getProductsByIds(ids: number[]): Observable<Pagination<Product[]>> {
    const strIds = ids.join(',');
    return this.http.get<Pagination<Product[]>>(this.productsUrl + strIds);
  }

  public getProductsWithSpecs(productParams: ProductParams): Observable<Pagination<Product[]>> {
    const params = this.genHttpParams(productParams);

    return this.http.get<Pagination<Product[]>>(this.productsUrl, {params: params});
  }

  public getProductBrands() {
    if (this.productBrandsSource.getValue().length === 1) {
      this.http.get<ProductBrand[]>(this.productsUrl + 'brands')
        .subscribe({
          next: productBrands => this.productBrandsSource.next([...this.productBrandsSource.getValue(), ...productBrands]),
          error: err => console.log(err)
        });
    }
  }

  public getProductTypes() {
    if (this.productTypesSource.getValue().length === 1) {
      this.http.get<ProductBrand[]>(this.productsUrl + 'types')
        .subscribe({
          next: productTypes => this.productTypesSource.next([...this.productTypesSource.getValue(), ...productTypes]),
          error: err => console.log(err)
        });
    }
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
    if ([
      {name: 'Alphabetical', value: 'name'},
      {name: 'Price: Low to High', value: 'priceAsc'},
      {name: 'Price: High to Low', value: 'priceDesc'}
    ].some(option => option.value === productParams.sortBy)) {
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

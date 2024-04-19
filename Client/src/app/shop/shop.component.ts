import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {Brand} from "../shared/models/brand";
import {Type} from "../shared/models/type";
import {Option} from "../shared/models/option";
import {ProductParams} from "../shared/models/product-params";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

export const SORT_OPTIONS: Option[] = [
  {name: 'Alphabetical', value: 'name'},
  {name: 'Price: Low to High', value: 'priceAsc'},
  {name: 'Price: High to Low', value: 'priceDesc'}
];
const OPTION_ALL = {id: 0, name: 'All'};

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {

  productParams: ProductParams = new ProductParams();
  products?: Product[];
  brands: Brand[] = [OPTION_ALL];
  types: Type[] = [OPTION_ALL];
  sortOptions: Option[] = SORT_OPTIONS;

  constructor(private router: Router, private shopService: ShopService, private spinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  private getProducts() {
    this.shopService.getProducts(this.productParams)
      .subscribe({
        next: response => {
          this.products = response.data;
          this.productParams.totalItems = response.count;
          this.productParams.pageSize = response.pageSize;
        },
        error: err => console.log(err)
      });
  }

  private getBrands() {
    this.shopService.getBrands()
      .subscribe({
        next: response => this.brands = [...this.brands, ...response],
        error: err => console.log(err),
      });
  }

  private getTypes() {
    this.shopService.getTypes()
      .subscribe({
        next: response => this.types = [...this.types, ...response],
        error: err => console.log(err),
      });
  }

  onBrandSelected(brandId: number) {
    if (this.productParams.brandId != brandId) {
      this.productParams.brandId = brandId;
      this.productParams.pageIndex = 1;
      this.getProducts();
    }
  }

  onTypeSelected(typeId: number) {
    if (this.productParams.typeId != typeId) {
      this.productParams.typeId = typeId;
      this.productParams.pageIndex = 1;
      this.getProducts();
    }
  }

  onSortSelected($event: any) {
    this.productParams.sortBy = $event.target.value;
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onSearch() {
    this.productParams.pageIndex = 1;
    this.getProducts();
  }

  onReset() {
    this.productParams = new ProductParams();
    this.getProducts();
  }

  onPageChanged(page: number) {
    if (this.productParams.pageIndex != page) {
      this.productParams.pageIndex = page;
      this.getProducts();
    }
  }

}

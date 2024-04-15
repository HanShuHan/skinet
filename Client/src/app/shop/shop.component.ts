import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/models/product";
import {ShopService} from "./shop.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private pageSize: number = -5;
  private pageIndex: number = 1;
  products?: Product[];
  count?: number;

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    const params: HttpParams = new HttpParams().appendAll({
      "pageSize": this.pageSize,
      "pageIndex": this.pageIndex
    });

    this.shopService.getProducts(params)
      .subscribe({
        next: response => {
          this.products = response.data;
          this.count = response.count;
        },
        error: err => console.log(err),
        complete: () => console.log('Request completed')
      });
  }

}

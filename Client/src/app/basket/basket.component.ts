import {Component, OnInit} from '@angular/core';
import {BasketService} from "./basket.service";
import {ShopService} from "../shop/shop.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{

  constructor(protected basketService: BasketService, protected shopService: ShopService) {
  }

  ngOnInit(): void {
    this.shopService.getProductBrands();
    this.shopService.getProductTypes();
  }

}

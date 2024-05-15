import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../basket.service";
import {ShopService} from "../../shop/shop.service";
import {ProductBrand} from "../../shared/models/product";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  @Input() isBasket: boolean = true;

  constructor(protected basketService: BasketService, protected shopService: ShopService) {
  }

  ngOnInit(): void {
    this.basketService.loadBasketProducts();
    this.shopService.getProductBrands();
    this.shopService.getProductTypes();
  }

  protected getBrandName(productBrandId: number, brands: ProductBrand[]) {
    return brands.find(brand => brand.id == productBrandId)?.name;
  }

  protected getTypeName(productTypeId: number, brands: ProductBrand[]) {
    return brands.find(brand => brand.id == productTypeId)?.name;
  }

  decrementByOne(productId: number) {
    this.basketService.decrementExistingItemById(1, productId);
  }

  incrementByOne(productId: number) {
    this.basketService.incrementExistingItemById(1, productId);
  }

  deleteBasketItemByIndex(index: number) {
    const isConfirmed = confirm('Are you sure you want to remove the item?');

    if (isConfirmed) {
      this.basketService.removeBasketItemByIndex(index);
    }
  }

}

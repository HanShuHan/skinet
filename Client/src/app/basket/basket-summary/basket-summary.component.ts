import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../basket.service";
import {ShopService} from "../../shop/shop.service";
import {ProductBrand} from "../../shared/models/product";
import {SimpleBasket, SimpleBasketItem} from "../../shared/models/simple-basket";
import {MAX_QUANTITY} from "../../../constants/number.constants";
import {getQuarter} from "ngx-bootstrap/chronos/units/quarter";

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
    this.basketService.decrement(1, productId);
  }

  incrementByOne(productId: number) {
    this.basketService.increment(1, productId);
  }

  deleteBasketItemById(id: number) {
    const isConfirmed = confirm('Are you sure you want to remove the item?');

    if (isConfirmed) {
      this.basketService.removeBasketItemByProductId(id);
    }
  }

}

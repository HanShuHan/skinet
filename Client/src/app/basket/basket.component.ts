import {Component, OnInit} from '@angular/core';
import {BasketService} from "./basket.service";
import {SimpleBasketItem} from "../shared/models/simpleBasket";
import {ShopService} from "../shop/shop.service";
import {ProductBrand} from "../shared/models/product";
import {MAX_QUANTITY, TAX_RATE} from "../shared/constants";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit{

  protected readonly TAX_RATE = TAX_RATE;

  constructor(protected basketService: BasketService, protected shopService: ShopService) {
  }

  ngOnInit(): void {
    this.basketService.getBasketProducts();
    this.shopService.getProductBrands();
    this.shopService.getProductTypes();
  }

  decrementQuantity(item: SimpleBasketItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.basketService.updateBasket();
    }
  }

  incrementQuantity(item: SimpleBasketItem): void {
    if (item.quantity < MAX_QUANTITY) {
      item.quantity += 1;
      this.basketService.updateBasket();
    }
  }

  confirmDelete(index: number): void {
    const isDeleted = confirm('Are you sure you want to remove the item?');

    if (isDeleted) {
      this.basketService.removeItemByIndex(index);
    }
  }

  protected getBrandName(productBrandId: number, brands: ProductBrand[]) {
    return brands.find(brand => brand.id == productBrandId)?.name;
  }

  protected getTypeName(productTypeId: number, brands: ProductBrand[]) {
    return brands.find(brand => brand.id == productTypeId)?.name;

  }

}

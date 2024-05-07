import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../basket.service";
import {ShopService} from "../../shop/shop.service";
import {ProductBrand} from "../../shared/models/product";
import {SimpleBasketItem} from "../../shared/models/simple-basket";
import {MAX_QUANTITY} from "../../../constants/number.constants";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit{

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

}

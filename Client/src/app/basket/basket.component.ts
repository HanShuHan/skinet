import {Component} from '@angular/core';
import {BasketService} from "./basket.service";
import {environment} from "../../environments/environment";
import {BasketItem} from "../shared/models/basket";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  protected readonly MAX_QUANTITY: number = environment.maxItemQuantity;
  protected readonly TAX_RATE = environment.taxRate;

  constructor(protected basketService: BasketService) {
  }

  minusQuantity(item: BasketItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.basketService.updateBasket();
    }
  }

  plusQuantity(item: BasketItem): void {
    if (item.quantity < this.MAX_QUANTITY) {
      item.quantity += 1;
      this.basketService.updateBasket();
    }
  }

  confirmDelete(item: BasketItem): void {
    const isDeleted = confirm('Are you sure you want to remove the item?');

    if (isDeleted) {
      this.basketService.removeItem(item);
    }
  }

}

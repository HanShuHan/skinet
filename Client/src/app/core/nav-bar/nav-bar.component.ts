import {Component} from '@angular/core';
import {BasketService} from "../../basket/basket.service";
import {SimpleBasketItem} from "../../shared/models/simpleBasket";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(protected basketService: BasketService, protected accountService: AccountService) {
  }

  getCount(items: SimpleBasketItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

}

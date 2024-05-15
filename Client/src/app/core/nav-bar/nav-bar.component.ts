import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../basket/basket.service";
import {SimpleBasketItem} from "../../shared/models/SimpleBasket";
import {AccountService} from "../../account/account.service";
import {environment} from "../../../environments/environment";

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

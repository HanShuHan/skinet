import {Component, OnInit} from '@angular/core';
import {AccountService} from "./account/account.service";
import {environment} from "../environments/environment";
import {BasketService} from "./basket/basket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService, protected basketService: BasketService) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadLocalSimpleBasket();
  }

  private loadUser() {
    this.accountService.loadUserByLocalToken();
  }

  private loadLocalSimpleBasket() {
    const localSimpleBasketId = localStorage.getItem(environment.basketId);
    if (localSimpleBasketId) {
      this.basketService.loadLocalBasketById(localSimpleBasketId);
    }
  }

}

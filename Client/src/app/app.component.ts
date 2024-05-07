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
    this.loadBasket();
  }

  private loadUser() {
    this.accountService.loadUserByLocalToken();
  }

  private loadBasket() {
    const basketId = localStorage.getItem(environment.basketId);
    if (basketId != null) {
      this.basketService.loadBasket(basketId);
    }
  }

}

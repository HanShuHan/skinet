import { Component } from '@angular/core';
import {TAX_RATE} from "../../../constants/number.constants";
import {BasketService} from "../basket.service";

@Component({
  selector: 'app-basket-totals',
  templateUrl: './basket-totals.component.html',
  styleUrls: ['./basket-totals.component.scss']
})
export class BasketTotalsComponent {

  protected readonly TAX_RATE = TAX_RATE;

  constructor(protected basketService: BasketService) {
  }

}

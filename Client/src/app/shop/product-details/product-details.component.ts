import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BasketService} from "../../basket/basket.service";
import {environment} from "../../../environments/environment";
import {BasketItem} from "../../shared/models/basket";

const MAX_QUANTITY: number = environment.maxItemQuantity;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  quantity: number = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, protected basketService: BasketService) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.shopService.getProduct(parseInt(id)).subscribe({
        next: response => {
          this.product = response;
          this.breadcrumbService.set('@productDetails', this.product.name);
        },
        error: err => console.log(err)
      });
    }
  }

  addItemToBasket(): void {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  plusQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  minusQuantity(): void {
    if (this.quantity < MAX_QUANTITY) {
      this.quantity += 1;
    }
  }

  getNumberOfItemsInBasket(id: number, items: BasketItem[]) {
    return items.find((item) => item.id === id)?.quantity;
  }
}

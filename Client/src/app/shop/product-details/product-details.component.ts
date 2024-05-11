import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BasketService} from "../../basket/basket.service";
import {SimpleBasketItem} from "../../shared/models/simple-basket";
import {MAX_QUANTITY} from "../../../constants/number.constants";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  quantity: number = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, protected basketService: BasketService) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.shopService.getProductById(parseInt(id)).subscribe({
        next: response => {
          this.product = response.data[0];
          this.breadcrumbService.set('@productDetails', this.product.name);
        },
        error: err => console.log(err)
      });
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.quantity, this.product);
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
  getNumberOfItemsInBasket(id: number, items: SimpleBasketItem[]) {
    return items.find((item) => item.productId === id)?.quantity;
  }
}

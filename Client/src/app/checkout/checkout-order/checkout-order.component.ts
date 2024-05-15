import {Component, OnInit} from '@angular/core';
import {Path} from "../../../constants/api.constants";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.scss']
})
export class CheckoutOrderComponent implements OnInit{

  protected readonly Path = Path;
  protected orderId?: string | null;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.orderId  = this.activatedRoute.snapshot.queryParams['orderId']
    console.log(this.activatedRoute.snapshot.paramMap)
  }

}

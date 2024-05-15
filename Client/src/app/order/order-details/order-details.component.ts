import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Order} from "../../shared/models/order";
import {Path} from "../../../constants/api.constants";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  protected order?: Order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const orderId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getUserOrderByOrderId(parseInt(orderId));
  }

  private getUserOrderByOrderId(id: number) {
    this.orderService.getUserOrderByOrderId(id)
      .subscribe({
        next: order => this.order = order,
        error: err => {
          console.log(err);
          this.router.navigateByUrl(Path.ORDERS).then();
        }
      });
  }
}

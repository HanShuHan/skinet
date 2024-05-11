import {Component, OnInit} from '@angular/core';
import {OrderService} from "./order.service";
import {Path, Route} from "../../constants/api.constants";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{

  constructor(protected orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.loadOrders();
  }

  protected readonly ApiPath = Route;
  protected readonly Route = Route;
  protected readonly Path = Path;
}

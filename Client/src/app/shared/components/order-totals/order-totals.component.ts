import {Component, Input} from '@angular/core';
import {TAX_RATE} from "../../../../constants/number.constants";
import {Order} from "../../models/order";

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent {

  protected readonly TAX_RATE = TAX_RATE;
  @Input() subtotal?: number;
  @Input() tax?: number;
  @Input() deliveryFee?: number;
  @Input() total?: number;

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  maxSize: number = 7;
  showBoundaryLinks: boolean = true;
  rotates: boolean = true;

  onPageChanged($event: PageChangedEvent) {
    this.pageChanged.emit($event.page);
  }

  onPageModelChanged($event: any) {
    console.log($event);
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-paging-header[totalItems]',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent implements OnInit {

  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;

  ngOnInit(): void {
    if (this.totalItems < 0) {
      throw new Error('The pagination\'s total items cannot be negative');
    }
    if (this.totalItems < 0) {
      throw new Error('The pagination\'s page size should be greater than 0');
    }
    if (this.totalItems < 0) {
      throw new Error('The pagination\'s page size should be greater than 0');
    }
  }

}

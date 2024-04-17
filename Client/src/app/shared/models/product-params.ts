export class ProductParams {

  brandId: number;
  typeId: number;
  searchTerm: string;
  sortBy: string;
  totalItems: number;
  pageSize: number;
  pageIndex: number;

  constructor(brandId: number = 0, typeId: number = 0, searchTerm: string = '', sortBy: string = 'name', totalItems: number = 0, pageSize: number = 3, pageIndex: number = 1) {
    this.brandId = brandId;
    this.typeId = typeId;
    this.searchTerm = searchTerm;
    this.sortBy = sortBy;
    this.totalItems = totalItems;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}

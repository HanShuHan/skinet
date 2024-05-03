export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productTypeId: number;
  productBrandId: number;
}

export interface ProductBrand {
  id: number;
  name: string;
}

export interface ProductType {
  id: number;
  name: string;
}

export interface Option {
  name: string;
  value: string;
}

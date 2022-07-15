import { IProduct } from './iproduct';

export interface ICart {
  id?: number;
  product: IProduct;
  quantity: number;
}

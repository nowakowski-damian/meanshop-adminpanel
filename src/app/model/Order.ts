import {ProductOrder} from "./ProductOrder";

export class Order {
  _id: string;
  names: string;
  address: string;
  totalAmount: number;
  products: ProductOrder[];
  done: boolean;

  constructor(names: string, address: string, totalAmount: number, products: ProductOrder[]) {
    this.names = names;
    this.address = address;
    this.totalAmount = totalAmount;
    this.products = products;
  }
}

import {Category} from "./Category";

export class Product {
  _id: string;
  name: string;
  img: string;
  description: string;
  longDescription: string;
  price: number;
  category: Category;
  quantity: number;
}

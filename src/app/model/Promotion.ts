import {Product} from "./Product";
import {OnChanges} from "@angular/core";

export class Promotion {
  product: Product;
  discountPerentage: number;
  durationMin: number;
  active: boolean;


  constructor(product: Product) {
    this.product = product;
    this.discountPerentage = 0;
    this.durationMin = 0;
    this.active = true;
  }

}

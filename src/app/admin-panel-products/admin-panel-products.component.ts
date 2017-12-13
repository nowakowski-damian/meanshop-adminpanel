import { Component, OnInit } from '@angular/core';
import {Product} from "../model/Product";
import {ApiService} from "../api.service";
import {Category} from "../model/Category";
import {isNullOrUndefined, isUndefined} from "util";
import {Promotion} from "../model/Promotion";

@Component({
  selector: 'app-admin-panel-products',
  templateUrl: './admin-panel-products.component.html',
  styleUrls: ['./admin-panel-products.component.css']
})
export class AdminPanelProductsComponent implements OnInit {

  products: Product[];
  currentProduct: Product;
  currentPromotion: Promotion;

  categories: Category[];

  isSavedSuccess: boolean;


  constructor(private api: ApiService) {
    this.products = [];
    this.categories = [];
    this.isSavedSuccess = false;
  }

  ngOnInit() {
    this.api.getProducts().subscribe(
      response => this.products = response,
      err => console.error(err),
    );
    this.api.getCategories().subscribe(
      response => this.categories = response,
      err => console.error(err),
    );
  }

  onProductDetails(product) {
    this.isSavedSuccess = false;
    this.currentPromotion = null;
    if (this.currentProduct === product) { // double click -> hide product details
      this.currentProduct = null;
    }
    else {
      this.currentProduct = product;
    }
  }

  onProductPromotion(product) {
    this.isSavedSuccess = false;
    this.currentProduct = null;
    if (this.currentPromotion && this.currentPromotion.product === product) { // double click -> hide product details
      this.currentPromotion = null;
    }
    else {
      this.currentPromotion = new Promotion(product);
    }
  }

  // onCurentProductCategoryChange(categoryId) {
  //   this.categories.forEach( (category) => {
  //     if( categoryId===category._id ) {
  //       this.currentProduct.category = category;
  //       return;
  //     }
  //   })
  // }

  onSaveProductButton() {
    if( isNullOrUndefined(this.currentProduct._id) ) {
      this.createProduct();
    }
    else {
      this.updateProduct();
    }
  }

  onSavePromotionButton() {
    this.createPromotion();
  }

  private updateProduct() {
    this.api.putProduct(this.currentProduct).subscribe(
      response =>console.log("updateProduct()",response),
      err => console.log(err),
      () => {
        this.currentProduct = null;
        this.isSavedSuccess = true;
      }
    );
  }

  private createProduct() {
    this.api.postProduct(this.currentProduct).subscribe(
      response =>console.log("postProduct()", response),
      err => console.error(err),
      () => {
        this.products.push(this.currentProduct);
        this.currentProduct = null;
        this.isSavedSuccess = true;
      }
    );
  }

  private createPromotion() {
    this.api.postPromotion(this.currentPromotion).subscribe(
      response =>console.log("createPromotion()", response),
      err => console.error(err),
      () => {
        this.currentPromotion = null;
        this.isSavedSuccess = true;
      }
    );
  }

  onNewProduct() {
    this.isSavedSuccess = false;
    if( this.currentProduct!=null && isNullOrUndefined(this.currentProduct._id) ) { // double click -> hide product details
      this.currentProduct = null;
    }
    else {
      let product = new Product();
      product.category = new Category();
      this.currentProduct = product;
    }
  }

}

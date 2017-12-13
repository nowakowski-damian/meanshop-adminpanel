import { Injectable } from '@angular/core';
import {LoginRequest} from "./model/LoginRequest";
import {Observable} from "rxjs/Observable";
import {Order} from "./model/Order";
import {Product} from "./model/Product";
import {Category} from "./model/Category";
import {LoginResponse} from "./model/LoginResponse";
import {HttpService} from "./http.service";
import {Promotion} from "./model/Promotion";

export const LOGIN = 'users/login';
const LOGOUT = 'users/logout';
const ORDERS = 'orders';
const PRODUCTS = 'products';
const PROMOTION = 'promotion';
const CATEGORIES = 'categories';



@Injectable()
export class ApiService {

  constructor(private http: HttpService) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post(LOGIN, loginRequest);
  }

  logout(): Observable<string> {
    return this.http.post(LOGOUT,null);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS);
  }

  putOrder(order:Order): Observable<Order> {
    return this.http.put<Order>(ORDERS+"/"+order._id, order);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS);
  }

  getProduct(id:string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS+"/"+id);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORIES);
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCTS,product);
  }

  putProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(PRODUCTS+"/"+product._id,product);
  }

  postPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(PROMOTION,promotion);
  }

}

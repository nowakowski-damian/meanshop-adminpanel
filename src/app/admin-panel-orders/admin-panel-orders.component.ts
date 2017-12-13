import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Order} from "../model/Order";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin-panel-orders',
  templateUrl: './admin-panel-orders.component.html',
  styleUrls: ['./admin-panel-orders.component.css'],
})
export class AdminPanelOrdersComponent implements OnInit {

  orders: Order[] = [];
  currentOrder: Order;

  constructor(private api: ApiService) {
    this.orders = [];
  }

  ngOnInit() {
    this.api.getOrders().subscribe(
      response => {
        this.orders = response;
      },
          err => console.error("getOrders() err:",err)
    );
  }

  onOrderDetails(order: Order) {
    if( this.currentOrder===order ) { //double clicked
      this.currentOrder = null;
    }
    else {
      this.currentOrder = order;
    }
  }

  onOrderDone(currentOrder) {
    this.api.putOrder(currentOrder).subscribe(
      next=> currentOrder.done = true
    );
  }

}

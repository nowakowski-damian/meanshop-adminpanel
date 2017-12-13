import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {ApiService} from "./api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AdminPanelOrdersComponent } from './admin-panel-orders/admin-panel-orders.component';
import { AdminPanelProductsComponent } from './admin-panel-products/admin-panel-products.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {HttpService} from "./http.service";
import {JwtInterceptor} from "./JwtInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    AdminPanelOrdersComponent,
    AdminPanelProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    AuthService,
    HttpService,
    [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

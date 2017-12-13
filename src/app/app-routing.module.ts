import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AdminPanelOrdersComponent} from "./admin-panel-orders/admin-panel-orders.component";
import {AdminPanelProductsComponent} from "./admin-panel-products/admin-panel-products.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AdminLoginComponent },
  { path: 'panel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'panel/orders', component: AdminPanelOrdersComponent, canActivate: [AuthGuard] },
  { path: 'panel/products', component: AdminPanelProductsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

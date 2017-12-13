import { Component } from '@angular/core';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  onLogoutButton() {
    sessionStorage.removeItem(environment.CURRENT_USER_KEY);
    this.router.navigate(['/auth']);
    // this.api.logout().subscribe(
    //   response => console.log(response),
    //   err => console.log(err),
    //   () => {}
    // );
  }

  isUserLogged() {
    return AuthService.isUserAuthenticated();
  }
}

import { Injectable } from '@angular/core';
import {LoginRequest} from "./model/LoginRequest";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {User} from "./model/User";
import {LoginResponse} from "./model/LoginResponse";
import {environment} from "../environments/environment";

@Injectable()
export class AuthService {

  constructor(private api: ApiService, private router: Router) {
  }


  logInUser(login: string, password: string, callback ) {
    let user =  new User(login, password);
    let loginRequest = new LoginRequest(user);
    this.api.login(loginRequest).subscribe(
      response => {
        if(response.success) {
          user.token = String(response.token);
          sessionStorage.setItem(environment.CURRENT_USER_KEY, JSON.stringify(user));
          this.router.navigate(["panel"]);
        }
        callback(response.success.valueOf());
      },
      err => {
        callback(false);
      },
      () => {}
    )
  }

  validateCurrentUser() : Observable<string> {
    let user: User = JSON.parse(sessionStorage.getItem(environment.CURRENT_USER_KEY));
    let loginRequest = new LoginRequest(user);
    return this.api.login(loginRequest).map(
      response => {
        if(response.success) {
          user.token = String(response.token);
          sessionStorage.setItem(environment.CURRENT_USER_KEY, JSON.stringify(user));
        }
        return user.token;
      }
    )



    // this.api.login(loginRequest).subscribe(
    //   response => {
    //     if(response.success) {
    //       user.token = String(response.token);
    //       sessionStorage.setItem(environment.CURRENT_USER_KEY, JSON.stringify(user));
    //     }
    //     callback(response.success.valueOf(), user.token );
    //     console.log("1response");
    //   },
    //   err => {
    //     console.log("1rerr",err);
    //     callback(false, null);
    //   },
    //   () => {        console.log("1complete");
    //   }
    // )



  }

  public static isUserAuthenticated() {
    let user: User = JSON.parse(sessionStorage.getItem(environment.CURRENT_USER_KEY));
    return !isNullOrUndefined(user) && !isNullOrUndefined(user.token);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {LoginRequest} from "../model/LoginRequest";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  @Input() login: string;
  @Input() password: string;

  loginValidated: boolean;
  passwordValidated: boolean;
  authorizationFailed: boolean;

  constructor(private authService: AuthService) {
    this.login = "";
    this.password = "";
    this.authorizationFailed = false;
  }

  ngOnInit() {
  }

  onLoginButton() {
    if( this.validateInput() ) {
      let self = this;
      this.authService.logInUser(this.login, this.password, function (isSuccess: boolean) {
        if(!isSuccess) {
          self.authorizationFailed = true;
        }
      });
    }
  }

  validateInput(): boolean {
    this.loginValidated = this.login.length>=3;
    this.passwordValidated = this.password.length>=3;
    return this.loginValidated && this.passwordValidated;
  }

}

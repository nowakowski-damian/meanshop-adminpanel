import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";
import {User} from "./model/User";
import {environment} from "../environments/environment";


@Injectable()
export class HttpService extends HttpClient{

  constructor(handler: HttpHandler) {
    super(handler);
  }


  delete<T>(url: string, options?): Observable<T> {
    return super.delete(environment.BASE_URL+url, this.addJwt(options)).catch(this.handleError);
  }

  get<T>(url: string, options?): Observable<T> {
    return super.get(environment.BASE_URL+url, this.addJwt(options) ).catch(this.handleError);
  }

  post<T>(url: string, body: any | any, options?): Observable<T> {
    return super.post(environment.BASE_URL+url, body, this.addJwt(options)).catch(this.handleError);
  }

  put<T>(url: string, body: any | any, options?): Observable<T> {
    return super.put(environment.BASE_URL+url, body, this.addJwt(options)).catch(this.handleError);
  }

  private addJwt(options?) {
    let user: User = JSON.parse(sessionStorage.getItem(environment.CURRENT_USER_KEY));
    if (user && user.token) {
      // ensure request options and headers are not null
      options = options || { headers: new HttpHeaders() };
      options.headers = options.headers.append(environment.TOKEN_HEADER,user.token);
    }
    return options;
  }

  private handleError(error: any) {
    // if (error.status === 401 && window.location.href !== '/auth') {
    //   // 401 unauthorized response so log user out of client
    //   window.location.href = '/auth';
    // }
    // if (error.status === 403 && window.location.href !== '/auth') {
    //   // 403 unauthorized response so log user out of client
    //   window.location.href = '/auth';
    // }
    return Observable.throw(error);
  }

}

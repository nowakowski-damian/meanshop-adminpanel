import 'rxjs/add/operator/do';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {Injectable, Injector} from "@angular/core";
import {LOGIN} from "./api.service";
import {environment} from "../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).catch( err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && err.url !== environment.BASE_URL + LOGIN) {
            //validate and do request again
            // return
            this.injector.get(AuthService).validateCurrentUser().subscribe(()=>window.location.reload() );
            // todo: refresh just request, not current page
            //   .map(
            //   token => {
            //     if (token) {
            //       request = request.clone({
            //         setHeaders: {
            //           environment.TOKEN_HEADER: token
            //         }
            //       });
            //     }
            //     return next.handle(request);
            //   }
            // );
          }
        }
        return Observable.throw(err);
      }
    )
  }






}

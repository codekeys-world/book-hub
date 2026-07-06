
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../token/token';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService : Token) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.token;
    if(token){
      const authRequest = req.clone({
        headers : new HttpHeaders({
          //'Authorization': `Bearer ${token}`
          'Authorization': 'Bearer ' + token
        })
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }

}

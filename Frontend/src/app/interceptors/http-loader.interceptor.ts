import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
        },
        error: (error) => {
          this.spinner.hide();
        },
      })
    );
  }
}

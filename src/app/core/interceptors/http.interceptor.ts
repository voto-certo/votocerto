import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UseStatesService } from '../services/states/use-states.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private useStatesService: UseStatesService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.useStatesService.show();
    return next.handle(req).pipe(
      finalize(() => this.useStatesService.hide())
    );
  }
}
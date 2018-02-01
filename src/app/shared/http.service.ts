import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;

@Injectable()
export class HttpService extends Http {
  public pendingRequests = 0;
  public showLoading = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    this.pendingRequests++;

    return observable
      .catch((err, source) => {
        console.log('Error: ' + err);
        return Observable.throw(err);
      })
      .do((res: Response) => {
        this.turnLoadingIconOn();
      }, (err: any) => {
        this.turnLoadingIconOff();
      })
      .finally(() => {
        const timer = Observable.timer(1000);
        timer.subscribe(t => {
          this.turnLoadingIconOff();
        });
      });
  }

  private turnLoadingIconOn() {
    if (!this.showLoading) {
      this.showLoading = true;
      $('.logo').addClass('loading-icon');
    }
    this.showLoading = true;
  }

  private turnLoadingIconOff() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        $('.logo').removeClass('loading-icon');
      }
      this.showLoading = false;
    }
  }
}

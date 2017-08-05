import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private oAuthService: OAuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.oAuthService.hasValidIdToken()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    // this.router.navigate(['/login']);
    console.log('Save url for redirect afterward.', state.url);
    this.oAuthService.initImplicitFlow();
    return false;

  }
}

import {Component} from '@angular/core';

import {OAuthService} from 'angular-oauth2-oidc';
import {SharedService} from './shared/shared.service';
import {environment} from '../environments/environment';

import {LoginModalComponent} from './modal/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private oAuthService: OAuthService, private sharedService: SharedService) {

    this.oAuthService.redirectUri = window.location.origin + '/';
    this.oAuthService.clientId = environment.production ? 'pluff-implicit' : 'pluff-dev';
    this.oAuthService.scope = 'openid profile fhict fhict_personal';
    this.oAuthService.oidc = true;
    this.oAuthService.setStorage(sessionStorage);

    const url = 'https://identity.fhict.nl/.well-known/openid-configuration';
    this.oAuthService.loadDiscoveryDocument(url).then(() => {

      this.oAuthService.tryLogin({});

      if (!this.oAuthService.hasValidAccessToken()) {
          this.sharedService.showModal.next(LoginModalComponent);
      }

    });

    this.oAuthService.tryLogin({});

  }

  public get isLoggedIn() {
    return this.oAuthService.hasValidAccessToken();
  }

  public get name() {
    const claims = this.oAuthService.getIdentityClaims();

    if (!claims) {
      return 'Unknown';
    }
    return claims.given_name;
  }
}

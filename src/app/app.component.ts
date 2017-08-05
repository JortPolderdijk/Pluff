import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oAuthService: OAuthService) {
    this.oAuthService.redirectUri = window.location.origin + '/';
    this.oAuthService.clientId = environment.production ? 'pluff-implicit' : 'pluff-dev';
    this.oAuthService.scope = 'openid profile fhict fhict_personal';
    this.oAuthService.oidc = true;
    this.oAuthService.setStorage(sessionStorage);

    const url = 'https://identity.fhict.nl/.well-known/openid-configuration';
    this.oAuthService.loadDiscoveryDocument(url).then(() => {

      this.oAuthService.tryLogin({});

      if (this.oAuthService.getIdToken() == null) {
        this.oAuthService.initImplicitFlow();
      }

    });

    this.oAuthService.tryLogin({});
  }


}

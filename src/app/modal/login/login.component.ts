import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginModalComponent implements OnInit {

  constructor(private oAuthService: OAuthService) { }

  autoLogin: boolean;

  close() {
    $('#overlay').hide();
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  ngOnInit() {
    if (this.oAuthService.hasValidAccessToken()) {
      this.close();
    }
  }

}

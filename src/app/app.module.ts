import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiClientService } from './fhict-api-service';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

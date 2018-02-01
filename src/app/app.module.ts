import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { HttpService } from './shared/http.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiClientService } from './fhict-api-service';

import { AuthGuard } from './auth/auth.guard';
import { TimetableComponent } from './timetable/timetable.component';
import { RoomsComponent } from './rooms/rooms.component';

import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './modal/login/login.component';
import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    RoomsComponent,
    ModalComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ApiClientService,
    SharedService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ],
  entryComponents: [LoginModalComponent],
  bootstrap: [AppComponent, ModalComponent]
})
export class AppModule { }

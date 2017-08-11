import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { OAuthModule } from 'angular-oauth2-oidc';
import { ApiClientService } from './fhict-api-service';
import { AuthGuard } from './auth/auth.guard';
import { TimetableComponent } from './timetable/timetable.component';
import { RoomsComponent } from './rooms/rooms.component';


@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    RoomsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

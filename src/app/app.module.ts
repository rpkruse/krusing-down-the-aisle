import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService, DataShareService } from './services/services';
import { StorageUtil } from './utils/utils'

import { NgEnterDirective } from './directives/ng-enter.directive';

import { 
  EventsComponent,
  HomeComponent,
  PhotosComponent,
  RegistryComponent,
  RsvpComponent,
  TravelComponent,
  WeddingPartyComponent,
  ToastComponent
 } 
from './components';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RsvpComponent,
    PhotosComponent,
    EventsComponent,
    WeddingPartyComponent,
    TravelComponent,
    RegistryComponent,
    ToastComponent,
    NgEnterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    DataShareService,
    StorageUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

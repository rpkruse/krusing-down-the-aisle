import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService } from './services/services';
import { StorageUtil } from './utils/utils'

import { 
  EventsComponent,
  HomeComponent,
  PhotosComponent,
  RegistryComponent,
  RsvpComponent,
  TravelComponent,
  WeddingPartyComponent
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
    RegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    AngularFontAwesomeModule
  ],
  providers: [
    ApiService,
    StorageUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core-module/core-module.module';
import { SharedModule } from './shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    NgProgressModule,
    NgProgressHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

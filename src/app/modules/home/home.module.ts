import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { HomeComponent } from './components/index';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }

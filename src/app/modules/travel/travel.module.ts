import { NgModule } from '@angular/core';
import { TravelComponent } from './components';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { TravelRoutingModule } from './travel-routing.module';

@NgModule({
  declarations: [TravelComponent],
  imports: [
    SharedModule,
    TravelRoutingModule
  ]
})
export class TravelModule { }

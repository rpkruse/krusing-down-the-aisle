import { NgModule } from '@angular/core';
import { EventsComponent } from './components';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }

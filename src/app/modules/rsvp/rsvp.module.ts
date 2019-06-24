import { NgModule } from '@angular/core';
import { RsvpComponent, RsvpCreateComponent, RsvpEditComponent } from './components';
import { RsvpRoutingModule } from './rsvp-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { RsvpService, SharedDataService } from './services';

@NgModule({
  declarations: [
    RsvpComponent,
    RsvpCreateComponent,
    RsvpEditComponent
  ],
  imports: [
    SharedModule,
    RsvpRoutingModule
  ],
  providers: [
    RsvpService,
    SharedDataService
  ]
})
export class RsvpModule { }

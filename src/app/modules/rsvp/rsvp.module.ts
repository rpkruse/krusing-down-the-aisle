import { NgModule } from '@angular/core';
import { RsvpComponent, RsvpCreateComponent, RsvpEditComponent } from './components';
import { RsvpRoutingModule } from './rsvp-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { RsvpService, SharedDataService } from './services';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

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
    SharedDataService,
    ConfirmationService
  ]
})
export class RsvpModule { }

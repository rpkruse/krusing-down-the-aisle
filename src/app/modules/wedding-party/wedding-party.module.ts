import { NgModule } from '@angular/core';
import { WeddingPartyComponent } from './components';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { WeddingPartyRoutingModule } from './wedding-party-routing.module';
import { WeddingPartyService } from './services';

@NgModule({
  declarations: [WeddingPartyComponent],
  imports: [
    SharedModule,
    WeddingPartyRoutingModule
  ],
  providers: [
    WeddingPartyService
  ]
})
export class WeddingPartyModule { }

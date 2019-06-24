import { NgModule } from '@angular/core';
import { RegistryComponent } from './components';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { RegistryRoutingModule } from './registry-routing.module';

@NgModule({
  declarations: [RegistryComponent],
  imports: [
    SharedModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }

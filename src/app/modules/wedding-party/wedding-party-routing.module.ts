import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeddingPartyComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: WeddingPartyComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WeddingPartyRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: RsvpComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RsvpRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: RegistryComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RegistryRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicturesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: PicturesComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PicturesRoutingModule { }

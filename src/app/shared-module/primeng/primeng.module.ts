import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    StepsModule
  ],
  exports: [
    ToastModule,
    StepsModule,
  ]
})
export class PrimengModule { }

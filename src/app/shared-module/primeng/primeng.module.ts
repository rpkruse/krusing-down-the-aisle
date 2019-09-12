import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    StepsModule,
    ConfirmDialogModule
  ],
  exports: [
    ToastModule,
    StepsModule,
    ConfirmDialogModule
  ]
})
export class PrimengModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgEnterDirective } from './directives';
import { FoodSelectorComponent, InformationEditorComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NgEnterDirective,
    FoodSelectorComponent,
    InformationEditorComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    PrimengModule,
    NgbModule,
    ReactiveFormsModule,
    NgEnterDirective,
    FoodSelectorComponent,
    InformationEditorComponent,
  ]
})
export class SharedModule { }

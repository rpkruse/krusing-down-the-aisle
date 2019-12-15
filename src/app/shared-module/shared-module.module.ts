import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgEnterDirective } from './directives';
import { FoodSelectorComponent, InformationEditorComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPartyMemberComponent } from './components/add-party-member/add-party-member.component';

@NgModule({
  declarations: [
    NgEnterDirective,
    FoodSelectorComponent,
    InformationEditorComponent,
    AddPartyMemberComponent
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
    AddPartyMemberComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToasterService } from './services/index';
import { MessageService } from 'primeng/components/common/messageservice';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ToasterService,
    MessageService
  ]
})
export class CoreModule { }

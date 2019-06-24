import { NgModule } from '@angular/core';
import { PicturesComponent } from './components/pictures/pictures.component';
import { PicturesRoutingModule } from './pictures-routing.module';
import { SharedModule } from 'src/app/shared-module/shared-module.module';
import { PicturesService } from './services';

@NgModule({
  declarations: [PicturesComponent],
  imports: [
    SharedModule,
    PicturesRoutingModule
  ],
  providers: [ PicturesService ]
})
export class PicturesModule { }

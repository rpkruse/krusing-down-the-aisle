import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
  EventsComponent,
  HomeComponent,
  PhotosComponent,
  RegistryComponent,
  RsvpComponent,
  RsvpCreateComponent,
  TravelComponent,
  WeddingPartyComponent
 } 
from './components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rsvp', component: RsvpCreateComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'events', component: EventsComponent },
  { path: 'wedding-party', component: WeddingPartyComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'registry', component: RegistryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

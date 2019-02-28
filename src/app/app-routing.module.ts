import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodResolver } from './services/services';

import { 
  EventsComponent,
  HomeComponent,
  PhotosComponent,
  RegistryComponent,
  RsvpComponent,
  TravelComponent,
  WeddingPartyComponent
 } 
from './components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'rsvp', component: RsvpComponent, resolve: { foods: FoodResolver }},
  { path: 'photos', component: PhotosComponent },
  { path: 'events', component: EventsComponent },
  { path: 'wedding-party', component: WeddingPartyComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'registry', component: RegistryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ FoodResolver ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from './shared-module/infrastructure';

const routes: Routes = [
  {
    path: Constants.uiRoutes.home,
    loadChildren: './modules/home/home.module#HomeModule'
  },
  // {
  //   path: Constants.uiRoutes.rsvp,
  //   loadChildren: './modules/rsvp/rsvp.module#RsvpModule'
  // },
  {
    path: Constants.uiRoutes.pictures,
    loadChildren: './modules/pictures/pictures.module#PicturesModule'
  },
  {
    path: Constants.uiRoutes.weddingParty,
    loadChildren: './modules/wedding-party/wedding-party.module#WeddingPartyModule'
  },
  {
    path: Constants.uiRoutes.travel,
    loadChildren: './modules/travel/travel.module#TravelModule'
  },
  {
    path: Constants.uiRoutes.registry,
    loadChildren: './modules/registry/registry.module#RegistryModule'
  },
  {
    path: Constants.uiRoutes.empty, redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled'
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

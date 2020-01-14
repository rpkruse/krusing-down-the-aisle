import { Component } from '@angular/core';
import { Constants } from './shared-module/infrastructure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'krusing-down-the-aisle';
  isNavCollapsed: boolean = true;

  pages: any = [
    {
      link: Constants.uiRoutes.home,
      text: 'Home'
    },
    // {
    //   link: Constants.uiRoutes.rsvp,
    //   text: 'RSVP'
    // },
    {
      link: Constants.uiRoutes.pictures,
      text: 'Photos'
    },
    {
      link: Constants.uiRoutes.weddingParty,
      text: 'Wedding Party'
    },
    {
      link: Constants.uiRoutes.travel,
      text: 'Travel'
    },
    {
      link: Constants.uiRoutes.registry,
      text: 'Gift Registry'
    }
  ];

  mobileNavLinkClicked(): void {
    this.isNavCollapsed = true;
  }
}

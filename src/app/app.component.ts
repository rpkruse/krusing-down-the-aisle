import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './global/shared-styles.css']
})
export class AppComponent {
  title = 'krusing-down-the-aisle';

  isNavCollapsed: boolean = true;

  pages: any = [
    {
      link: "home",
      text: "Home"
    },
    {
      link: "rsvp",
      text: "RSVP"
    },
    {
      link: "photos",
      text: "Photos"
    },
    {
      link: "events",
      text: "Events"
    },
    {
      link: "wedding-party",
      text: "Wedding Party"
    },
    {
      link: "travel",
      text: "Travel"
    },
    {
      link: "registry",
      text: "Gift Registry"
    }
  ]
}

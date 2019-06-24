import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isReadingMore: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  readMoreClicked(): void {
    this.isReadingMore = !this.isReadingMore;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', '../global/shared-styles.css']
})
export class PhotosComponent implements OnInit {
  
  //This is temp
  images: string[] = [
    "assets/pictures/food/chicken.png",
    "assets/pictures/food/fish.png",
    "assets/pictures/food/salad.png",
    "assets/pictures/food/steak.png"
  ];

  constructor() { }

  ngOnInit() { }

}

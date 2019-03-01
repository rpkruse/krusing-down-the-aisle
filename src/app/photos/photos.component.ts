import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', '../global/shared-styles.css']
})
export class PhotosComponent implements OnInit {
  
  //This is temp
  images: string[] = [
    "https://docs.google.com/uc?id=1wHDeNtIwiZu_nKthQVzUIZUeIOnxuVNW", //chicken
    "https://docs.google.com/uc?id=1IxRr-DKzzkEOQNG6KiCvr1l_G_jrz_OT", //fish
    "https://docs.google.com/uc?id=1M4qOVuIFRT9PmmayamZP4w6dMOd3JDNm", //salad
    "https://docs.google.com/uc?id=1PUSrvEt6ugP_RS4OEkDUhf1d4ufVOG1M" //steak
  ];

  constructor() { }

  ngOnInit() { }

}

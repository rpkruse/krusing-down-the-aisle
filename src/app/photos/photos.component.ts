import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/services';
import { Observable } from 'rxjs';
import { IPhoto } from '../interfaces/interfaces';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css', '../global/shared-styles.css']
})
export class PhotosComponent implements OnInit {
  
  photos: Observable<IPhoto[]>; 

  constructor(private _apiService: ApiService) { }

  ngOnInit() { 
    this.photos = this._apiService.getAllEntities<IPhoto>('Photos');
  }
}

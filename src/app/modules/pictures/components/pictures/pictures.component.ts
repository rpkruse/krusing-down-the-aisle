import { Component, OnInit } from '@angular/core';
import { PicturesService } from '../../services';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/shared-module/models';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  pictures: Observable<Photo[]>;

  constructor(private pictureService: PicturesService) { }

  ngOnInit() {
    this.pictures = this.pictureService.getAllPictures();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/shared-module/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private http: HttpClient) { }

  getAllPictures(): Observable<Photo[]> {
    return this.http.get(environment.api + 'Photos') as Observable<Photo[]>;
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IFood } from 'src/app/interfaces/interfaces';
import { ApiService } from '../api/api.services';

@Injectable({
  providedIn: 'root'
})

export class FoodResolver implements Resolve<any>{

  constructor(private _apiService: ApiService) { }

  resolve(): Observable<IFood[]> {
    return this._apiService.getAllEntities<IFood>('Foods');
  }
}

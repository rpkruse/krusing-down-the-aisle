import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IApiService } from './iapi.services';
import { IPerson } from '../../interfaces/interfaces';
//import { StorageService } from '../session/session-storage.service';

//import { User } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ApiService implements IApiService {
  constructor(private _http: HttpClient) {}

  public getSingleEntity<T>(path: string, id: number): Observable<T> {
    return this._http.get(environment.api + path + '/' + id) as Observable<T>;
  }

  public getAllEntities<T>(path: string): Observable<T[]> {
    return this._http.get(environment.api + path) as Observable<T[]>;
  }

  public putEntity<T>(path: string, id: number, entity: Object): Observable<T> {
    return this._http.put(environment.api + path + '/' + id, entity) as Observable<T>;
  }

  public lookupRSVP (name: string): Observable<IPerson> {
    return this._http.get(environment.api + `Persons/Lookup?name=${name}`) as Observable<IPerson>;
  }
}
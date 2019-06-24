import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeddingParty } from 'src/app/shared-module/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeddingPartyService {

  constructor(private http: HttpClient) { }

  getBridalParty(): Observable<WeddingParty[]> {
    return this.http.get(environment.api + 'WeddingParty/BridalParty') as Observable<WeddingParty[]>;
  }

  getGroomsParty(): Observable<WeddingParty[]> {
    return this.http.get(environment.api + 'WeddingParty/GroomsParty') as Observable<WeddingParty[]>;
  }
}

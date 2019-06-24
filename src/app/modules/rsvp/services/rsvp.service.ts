import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food, Person, PlusOne } from 'src/app/shared-module/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  constructor(private http: HttpClient) { }

  getAllFood(): Observable<Food[]> {
    return this.http.get(`${environment.api}Foods`) as Observable<Food[]>;
  }

  lookupRSVP(name: string): Observable<Person> {
    return this.http.get(`${environment.api}Persons/Lookup?name=${name}`) as Observable<Person>;
  }

  savePersonChanges(person: Person): Observable<Person> {
    return this.http.put(`${environment.api}Persons/${person.id}`, person) as Observable<Person>;
  }

  addPlusOne(plusOne: any): Observable<PlusOne> {
    return this.http.post(`${environment.api}PlusOnes`, plusOne) as Observable<PlusOne>;
  }

  savePlusOne(plusOne: PlusOne): Observable<PlusOne> {
    return this.http.put(`${environment.api}PlusOnes/${plusOne.id}`, plusOne) as Observable<PlusOne>;
  }

  deletePlusOne(id: number): Observable<PlusOne> {
    return this.http.delete(`${environment.api}PlusOnes/${id}`) as Observable<PlusOne>;
  }
}

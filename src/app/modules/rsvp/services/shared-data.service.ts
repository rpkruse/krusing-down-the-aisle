import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Food, Person } from 'src/app/shared-module/models';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public foods: Subject<Food[]> = new BehaviorSubject<Food[]>([]);
  public person: BehaviorSubject<Person> = new BehaviorSubject<Person>(null);

  constructor() { }

  public changeFoods(foods: Food[]): void {
    this.foods.next(foods);
  }

  public changePerson(person: Person): void {
    this.person.next(person);
  }

  public clearData(): void {
    this.foods.next([]);
    this.person.next(null);
  }
}

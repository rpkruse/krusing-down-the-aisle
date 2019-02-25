import { IPerson, IFood, IPlusOne } from "../interfaces/interfaces";
import { Observable, Subscription } from "rxjs";
import { ApiService } from "../services/services";

export class ModalHandler {
  public foods: IFood[] = [];

  private _person: IPerson;

  constructor(private _apiService: ApiService) {
    let s: Subscription = this._apiService.getAllEntities<IFood>('Foods').subscribe(
      f => this.foods = f,
      err => console.log("Unable to load foods"),
      () => s.unsubscribe()
    )
  }

  set person(p: IPerson) {
    if (!p) {
      console.error("Invalid set for person in ModalHandler");
      return;
    }

    /*this._person = {
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      hasPlusone: p.hasPlusone,
      foodId: p.foodId,
      allergy: p.allergy,
      food: p.food,
      hasAllergy: p.hasAllergy,
      plusOne: p.plusOne,
      plusOneId: p.plusOneId
    };*/
    this._person = { ...p };
  }
  
  get person(): IPerson {
    return this._person;
  }

  public changeFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);
    
    this._person.foodId = this.foods[foodIndex].id;
    this._person.food = this.foods[foodIndex];
  }

  public savePersonChanges(): void {
    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', this._person.id, this._person).subscribe(
      p => p = p,
      err => console.log(err),
      () => {
        s.unsubscribe();
      }
    );
  }

  public getAllFoods(): Observable<IFood[]> {
    return this._apiService.getAllEntities<IFood>('Foods');
  }
}
import { IPerson, IFood, IPlusOne, IMessageType } from "../interfaces/interfaces";
import { Observable, Subscription } from "rxjs";
import { ApiService, DataShareService } from "../services/services";

export class ModalHandler {
  public foods: IFood[] = [];

  private _person: IPerson;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService) {
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
      err => {
        console.log(err);
        this.displayToaster("Unable to save RSVP Info", "Successfully", IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.displayToaster("RSVP Info", "Saved Successfully", IMessageType.Success);
      }
    );
  }

  public getAllFoods(): Observable<IFood[]> {
    return this._apiService.getAllEntities<IFood>('Foods');
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({message: message, action: action, mType: mType});
  }
}
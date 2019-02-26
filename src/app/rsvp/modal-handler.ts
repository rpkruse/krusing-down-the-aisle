import { IPerson, IFood, IPlusOne, IMessageType } from "../interfaces/interfaces";
import { Observable, Subscription } from "rxjs";
import { ApiService, DataShareService } from "../services/services";

export class ModalHandler {
  public foods: IFood[] = [];
  public addPlusOne: boolean = false;

  private _person: IPerson;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService) {
    this._dataShareService.person.subscribe(res => this.setUpdatedPerson(res));
    this.getAllFoods();
  }

  public changeFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);
    
    this._person.foodId = this.foods[foodIndex].id;
    this._person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);

    this._person.plusOne.foodId = this.foods[foodIndex].id;
    this._person.plusOne.food = this.foods[foodIndex];
  }

  public savePersonChanges(): void {
    this.savePlusOneChanges();
  }

  public deletePlusOne(): void {
    let s: Subscription = this._apiService.deleteEntity<IPlusOne>('PlusOnes', this._person.plusOne.id).subscribe(
      d => d = d,
      err => { 
        console.error("Unable to delete plus one entity", err);
        this.displayToaster("Unable to", "delete plus one", IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.getPerson();
      }
    );
  }

  private savePlusOneChanges(): void {
    if (this.addPlusOne)
      this.addPlusOneEntity();
    else
      this.updatePlusOneEntity();
  }

  private addPlusOneEntity(): void {
    let pOne = {
      firstName: this._person.plusOne.firstName,
      lastName: this._person.plusOne.lastName,
      foodId: this._person.plusOne.foodId,
      personId: this._person.plusOne.personId
    };

    let s: Subscription = this._apiService.postEntity<IPlusOne>('PlusOnes', pOne).subscribe(
      d => this._person.plusOne = d,
      err => console.error("Unable to add plus one entity", err),
      () => {
        s.unsubscribe();
        this.saveAllChanges();
      }
    );
  }

  private updatePlusOneEntity(): void {
    if (!this._person.plusOne) {
      this.saveAllChanges();
      return;
    }

    let s: Subscription = this._apiService.putEntity<IPlusOne>('PlusOnes', this._person.plusOne.id, this._person.plusOne).subscribe(
      d => d = d,
      err => console.error("Unable to update plus one entity", err),
      () => {
        s.unsubscribe();
        this.saveAllChanges();
      }
    );
  }

  private saveAllChanges(): void {
    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', this._person.id, this._person).subscribe(
      p => p = p,
      err => {
        console.error(err);
        this.displayToaster("Unable to save RSVP Info", "Successfully", IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.displayToaster("RSVP Info", "Saved Successfully", IMessageType.Success);
        this.getPerson();
      }
    );
  }

  private setUpdatedPerson(person: IPerson): void {
    this._person = person;
  }

  public getPerson(): void {
    let s: Subscription = this._apiService.getSingleEntity<IPerson>('Persons', this._person.id).subscribe(
      d => this._dataShareService.changePerson(d),
      err => console.log(err),
      () => s.unsubscribe()
    );
  }

  private getAllFoods(): void {
    let s: Subscription = this._apiService.getAllEntities<IFood>('Foods').subscribe(
      f => this.foods = f,
      err => console.error("Unable to load foods", err),
      () => s.unsubscribe()
    );
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({message: message, action: action, mType: mType});
  }
}
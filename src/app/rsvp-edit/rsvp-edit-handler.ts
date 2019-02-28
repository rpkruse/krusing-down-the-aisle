import { ApiService, DataShareService } from "../services/services";
import { IPerson, IFood, IMessageType, IPlusOne } from "../interfaces/interfaces";
import { Subscription } from "rxjs";

export class RsvpEditHandler {
  private person: IPerson;
  
  public foods: IFood[] = [];

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService) {
    this.getAllFood();
    this._dataShareService.person.subscribe(res => this.setPersonValue(res));
  }

  public savePersonChanges(): void {
    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', this.person.id, this.person).subscribe(
      d => d,
      err => {
        console.error('Unable to update RSVP', err);
        this.displayToaster('Unable to', 'updated RSVP info', IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this._dataShareService.changePerson(this.person);
        this.displayToaster('RSVP info', 'updated successfully', IMessageType.Success);
      }
    );
  }

  public postPlusOne(): void {
    let poToSend = {
      firstName: this.person.plusOne.firstName,
      lastName: this.person.plusOne.lastName,
      hasAllergy: this.person.plusOne.allergy.length > 0,
      allergy: this.person.plusOne.allergy,
      foodId: this.person.plusOne.foodId,
      personId: this.person.id
    };

    const p1Food: IFood = { ...this.person.plusOne.food };

    let s: Subscription = this._apiService.postEntity<IPlusOne>('PlusOnes', poToSend).subscribe(
      d => this.person.plusOne = d,
      err => {
        console.error('Unable to post +1 entity', err);
        this.displayToaster('Unable to', 'add plus one', IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.displayToaster('Plus one', 'added successfully', IMessageType.Success);
        this.person.plusOne.food = p1Food;
        this._dataShareService.changePerson(this.person);     
      }
    );
  }

  public savePlusOneChanges(): void {
    let s: Subscription = this._apiService.putEntity<IPlusOne>('PlusOnes', this.person.plusOne.id, this.person.plusOne).subscribe(
      d => d,
      err => {
        console.error('Unable to update +1 entity', err);
        this.displayToaster('Unable to', 'update +1 information', IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.displayToaster('Plus one information', 'updated successfully', IMessageType.Success);
        //console.log(this.person.plusOne);
        this._dataShareService.changePerson(this.person);
      }
    );
  }

  public deletePlusOne(): void {
    let s: Subscription = this._apiService.deleteEntity<IPlusOne>('PlusOnes', this.person.plusOne.id).subscribe(
      d => d,
      err => {
        console.error('Unable to delete +1 entity', err);
        this.displayToaster('Unable to', 'remove +1', IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.person.plusOne = null;
        this._dataShareService.changePerson(this.person);
        this.displayToaster('Plus one', 'removed successfully', IMessageType.Success);
      }
    );
  }

  public changeFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);
    
    this.person.foodId = this.foods[foodIndex].id;
    this.person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);

    this.person.plusOne.foodId = this.foods[foodIndex].id;
    this.person.plusOne.food = this.foods[foodIndex];
  }

  public getPlusOneFoodImage(): string {
    return this.person.plusOne.food.img;
  }

  public getPlusOneFoodDesc(): string {
    return this.person.plusOne.food.desc;
  }

  public setPersonValue(person: IPerson): void {
    if (!person) return;
    
    this.person = { ...person };
    this.person.plusOne = { ...person.plusOne };
  }

  private getAllFood(): void {
    let s: Subscription = this._apiService.getAllEntities<IFood>('Foods').subscribe(
      d => this.foods = d,
      err => console.error('Unable to get list of foods', err),
      () => s.unsubscribe()
    );
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }
}
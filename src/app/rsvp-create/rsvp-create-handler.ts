import { ApiService, DataShareService } from "../services/services";
import { IPerson, IFood, IMessageType, IPlusOne } from "../interfaces/interfaces";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

export class RsvpHandler {
  private person: IPerson;
  
  public foods: IFood[] = [];
  public shouldAddPlusOne: boolean = true;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _router: Router) {
    this._dataShareService.person.subscribe(res => this.setPersonValue(res));
    this.getAllFood();
  }

  public saveRSVP(): void {
    if (this.shouldAddPlusOne)
      this.postPlusOne();
    else
      this.updateRSVP();
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

  private postPlusOne(): void {
    const poToSend = {
      firstName: this.person.plusOne.firstName,
      lastName: this.person.plusOne.lastName,
      foodId: this.person.plusOne.foodId,
      hasAllergy: this.person.plusOne.allergy.length > 0,
      allergy: this.person.plusOne.allergy,
      personId: this.person.id
    }

    let s: Subscription = this._apiService.postEntity<IPlusOne>('PlusOnes', poToSend).subscribe(
      d => this.person.plusOne = d,
      err => {
        console.error("Unable to add plus one entity", err);
        this.displayToaster("Unable to", "add plus one", IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.updateRSVP();
      }
    );
  }

  private updateRSVP(): void {
    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', this.person.id, this.person).subscribe(
      d => d,
      err => {
        console.error("Unable to update RSVP", err),
        this.displayToaster("Unable to", "update RSVP", IMessageType.Failure);
      },
      () => {
        s.unsubscribe();
        this.displayToaster("RSVP saved", "successfully", IMessageType.Success);
        this._router.navigateByUrl('/home');
      }
    );
  }
  
  private getAllFood(): void {
    let s: Subscription = this._apiService.getAllEntities<IFood>('Foods').subscribe(
      d => this.foods = d,
      err => console.error('Unable to get list of foods', err),
      () => s.unsubscribe()
    );
  }

  private setPersonValue(person: IPerson): void {
    this.person = person;

    if (this.person)
      this.shouldAddPlusOne = this.person.hasPlusone;
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }
}
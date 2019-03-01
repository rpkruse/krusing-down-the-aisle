import { ApiService, DataShareService } from "../services/services";
import { IPerson, IMessageType, IPlusOne, IFood } from "../interfaces/interfaces";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

export class RsvpHandler {

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _router: Router) { }

  public saveRSVP(person: IPerson): void {
    if (person.plusOne)
      this.postPlusOne(person);
    else
      this.updateRSVP(person);
  }

  private postPlusOne(person: IPerson): void {
    const poToSend = {
      firstName: person.plusOne.firstName,
      lastName: person.plusOne.lastName,
      foodId: person.plusOne.foodId,
      hasAllergy: person.plusOne.allergy.length > 0,
      allergy: person.plusOne.allergy,
      personId: person.id
    }

    const savedFood: IFood = { ...person.plusOne.food };

    let s: Subscription = this._apiService.postEntity<IPlusOne>('PlusOnes', poToSend).subscribe(
      d => person.plusOne = d,
      err => this.displayToasterAndLogError('Unable to', 'add plus one', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        person.plusOne.food = savedFood;
        this.updateRSVP(person);
      }
    );
  }

  private updateRSVP(person: IPerson): void {
    person.hasRSVPD = true;

    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', person.id, person).subscribe(
      d => d,
      err => this.displayToasterAndLogError('Unable to', 'update RSVP', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        this.displayToaster("RSVP saved", "successfully", IMessageType.Success);
        this._dataShareService.changePerson(person);
      }
    );
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }

  private displayToasterAndLogError(message: string, action: string, mType: IMessageType, err: any): void {
    console.error(message + action, err);
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }
}
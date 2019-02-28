import { ApiService, DataShareService } from "../services/services";
import { IPerson, IFood, IMessageType, IPlusOne } from "../interfaces/interfaces";
import { Subscription, Observable } from "rxjs";

export class RsvpEditHandler {
  private person: IPerson;
  
  public foods: IFood[] = [];

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService) { }

  public savePersonChanges(person: IPerson): void {
    let s: Subscription = this._apiService.putEntity<IPerson>('Persons', person.id, person).subscribe(
      d => d,
      err => this.displayToasterAndLogError('Unable to', 'update RSVP info', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        this.displayToaster('RSVP info', 'updated successfully', IMessageType.Success);
      }
    );
  }

  public postPlusOne(person: IPerson, plusOne: IPlusOne): void {
    let poToSend = {
      firstName: plusOne.firstName,
      lastName: plusOne.lastName,
      hasAllergy: plusOne.allergy.length > 0,
      allergy: plusOne.allergy,
      foodId: plusOne.foodId,
      personId: person.id
    };

    const p1F: IFood = { ...plusOne.food };

    let s: Subscription = this._apiService.postEntity<IPlusOne>('PlusOnes', poToSend).subscribe(
      d => person.plusOne = d,
      err => this.displayToasterAndLogError('Unable to', 'add plus one', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        this.displayToaster('Plus one', 'added successfully', IMessageType.Success);
        person.plusOne.food = p1F;
        this._dataShareService.changePerson(person);     
      }
    );
  }

  public savePlusOneChanges(person: IPerson, plusOne: IPlusOne): void {
    plusOne.hasAllergy = plusOne.allergy.length > 0;

    let s: Subscription = this._apiService.putEntity<IPlusOne>('PlusOnes', person.plusOne.id, plusOne).subscribe(
      d => d,
      err => this.displayToasterAndLogError('Unable to', 'update +1 information', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        this.displayToaster('Plus one information', 'updated successfully', IMessageType.Success);
        person.plusOne = { ...plusOne };
        this._dataShareService.changePerson(person);
      }
    );
  }

  public deletePlusOne(person: IPerson): void {
    let s: Subscription = this._apiService.deleteEntity<IPlusOne>('PlusOnes', person.plusOne.id).subscribe(
      d => d,
      err => this.displayToasterAndLogError('Unable to', 'remove +1', IMessageType.Failure, err),
      () => {
        s.unsubscribe();
        person.plusOne = null;
        this._dataShareService.changePerson(person);
        this.displayToaster('Plus one', 'removed successfully', IMessageType.Success);
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
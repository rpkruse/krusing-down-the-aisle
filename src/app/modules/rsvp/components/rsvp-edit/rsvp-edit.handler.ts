import { Observable, Subscription } from 'rxjs';
import { Person, PlusOne, Food } from 'src/app/shared-module/models';
import { RsvpService, SharedDataService } from '../../services';
import { ToasterService } from 'src/app/core-module/services';

export class RsvpEditHandler {

  constructor(private rsvpService: RsvpService, private sharedDataService: SharedDataService, private toasterService: ToasterService) { }

  public savePersonChanges(person: Person): void {
    const s: Subscription = this.rsvpService.savePersonChanges(person).subscribe(
      d => d,
      err => this.toasterService.showError('Unable to update RSVP info'),
      () => {
        s.unsubscribe();
        this.toasterService.showSuccess('RSVP Info Updated Successfully', 'Your RSVP info was updated successfully');
      }
    );
  }

  public addPlusOne(person: Person, plusOne: PlusOne): void {
    const poToSend = {
      firstName: plusOne.firstName,
      lastName: plusOne.lastName,
      hasAllergy: plusOne.allergy.length > 0,
      allergy: plusOne.allergy,
      foodId: plusOne.foodId,
      personId: person.id
    };

    const p1F: Food = { ...plusOne.food };

    const s: Subscription = this.rsvpService.addPlusOne(poToSend).subscribe(
      d => person.plusOne = d,
      err => this.toasterService.showError('Unable to add +1 to your RSVP, please try again'),
      () => {
        s.unsubscribe();
        this.toasterService.showSuccess('+1 added successfully', 'Your +1 was added to your RSVP');
        person.plusOne.food = p1F;
        this.sharedDataService.changePerson(person);
      }
    );
  }

  public savePlusOneChanges(person: Person, plusOne: PlusOne): void {
    plusOne.hasAllergy = plusOne.allergy.length > 0;

    const s: Subscription = this.rsvpService.savePlusOne(plusOne).subscribe(
      d => d,
      err => this.toasterService.showError('Unable to update +1 information'),
      () => {
        s.unsubscribe();
        this.toasterService.showSuccess('+1 information updated successfully', 'Your +1 information has been updated to your RSVP');
        person.plusOne = { ...plusOne };
        this.sharedDataService.changePerson(person);
      }
    );
  }

  public deletePlusOne(person: Person): void {
    const s: Subscription = this.rsvpService.deletePlusOne(person.plusOne.id).subscribe(
      d => d,
      err => this.toasterService.showError('Unable to delete +1'),
      () => {
        s.unsubscribe();
        person.plusOne = null;
        this.sharedDataService.changePerson(person);
        this.toasterService.showSuccess('+1 removed successfully', 'Your +1 has been removed from your RSVP');
      }
    );
  }
}

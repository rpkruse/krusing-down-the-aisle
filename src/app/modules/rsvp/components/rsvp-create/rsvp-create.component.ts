import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Food, Person, PlusOne } from 'src/app/shared-module/models';
import { SharedDataService, RsvpService } from '../../services';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ToasterService } from 'src/app/core-module/services';

@Component({
  selector: 'app-rsvp-create',
  templateUrl: './rsvp-create.component.html',
  styleUrls: ['./rsvp-create.component.scss']
})
export class RsvpCreateComponent implements OnInit, OnChanges, OnDestroy {
  @Input() foods: Food[];

  steps: MenuItem[] = [];

  person: Person;
  plusOne: PlusOne;
  activeIndex = 0;
  saving = false;

  sharedDataSub: Subscription;

  constructor(private sharedDataService: SharedDataService, private rsvpService: RsvpService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.sharedDataSub = this.sharedDataService.person.subscribe(res => this.setPerson(res));
  }

  ngOnChanges() {
    if (this.foods && !this.plusOne) {
      this.createEmptyPlusOne();
    }
  }

  changeFoodSelection(foodIndex: number): void {
    this.person.foodId = this.foods[foodIndex].id;
    this.person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndex: string): void {
    this.plusOne.foodId = this.foods[foodIndex].id;
    this.plusOne.food = this.foods[foodIndex];
  }

  handlePlusOneOutput(plusOne: PlusOne): void {
    this.person.plusOne = plusOne;
  }

  finishRSVP(): void {
    this.saving = true;

    if (this.person.plusOne)
      this.savePlusOne();
    else
      this.saveRSVP();
  }

  skipPlusOne(): void {
    this.person.plusOne = null;
    this.createEmptyPlusOne();
    this.activeIndex++;
  }

  movePage(dir: number): void {
    this.activeIndex += dir;
  }

  closeCreatePage(): void {
    this.sharedDataService.changePerson(null);
  }

  isNextButtonDisabled(): boolean {
    switch (this.activeIndex) {
      case 0:
        return false;
      case 1:
        if (this.person.hasPlusone && this.person.plusOne !== null) return false;
        return true;
      default:
        return true;
    }
  }

  private savePlusOne(): void {
    const poToSend = {
      firstName: this.person.plusOne.firstName,
      lastName: this.person.plusOne.lastName,
      foodId: this.person.plusOne.foodId,
      hasAllergy: this.person.plusOne.allergy.length > 0,
      allergy: this.person.plusOne.allergy,
      personId: this.person.id
    };
    const savedFood: Food = { ...this.person.plusOne.food };

    const s: Subscription = this.rsvpService.addPlusOne(poToSend).subscribe(
      d => this.person.plusOne = d,
      err => this.toasterService.showError('Unable to save +1'),
      () => {
        s.unsubscribe();
        this.person.plusOne.food = savedFood;
        this.saveRSVP();
      }
    );
  }

  private saveRSVP(): void {
    this.person.hasRSVPD = true;

    const s: Subscription = this.rsvpService.savePersonChanges(this.person).subscribe(
      d => d,
      err =>  {
        this.toasterService.showError('Unable to save RSVP, please try again later');
        this.saving = false;
      },
      () => {
        s.unsubscribe();
        this.toasterService.showSuccess('RSVP Saved Successfully', 'Your RSVP was successfully saved');
        this.saving = false;
        this.sharedDataService.changePerson(this.person);
      }
    );
  }

  private setPerson(person: Person): void {
    if (!person) return;

    this.person = person;
    this.setSteps();
  }

  private createEmptyPlusOne(): void {
    this.plusOne = {
      id: 0,
      firstName: '',
      lastName: '',
      hasAllergy: false,
      allergy: '',
      foodId: 1,
      food: this.foods[0],
      personId: this.person.id,
      person: this.person
    };
  }

  private setSteps(): void {
    this.steps.push({ label: 'Select Food', command: (event: any) => this.activeIndex = 0 });

    if (this.person.hasPlusone)
      this.steps.push({ label: 'Add +1', command: (event: any) => this.activeIndex = 1 });

    this.steps.push({ label: 'Confirm RSVP', command: (event: any) => this.activeIndex = 2 });
  }

  ngOnDestroy() {
    this.sharedDataSub.unsubscribe();
  }

}

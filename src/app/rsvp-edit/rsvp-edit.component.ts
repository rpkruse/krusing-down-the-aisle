import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, DataShareService } from '../services/services';
import { RsvpEditHandler } from './rsvp-edit-handler';
import { IPerson, IPlusOne, IFood } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-edit',
  templateUrl: './rsvp-edit.component.html',
  styleUrls: ['./rsvp-edit.component.css', '../global/shared-styles.css']
})
export class RsvpEditComponent implements OnInit {
  @Input() foods: IFood[];

  private dataShareSub: Subscription;
  
  rsvpHandler: RsvpEditHandler;
  person: IPerson;
  plusOne: IPlusOne;

  canSavePlusOneChanges: boolean = true;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal) { }

  ngOnInit() {
    this.rsvpHandler = new RsvpEditHandler(this._apiService, this._dataShareService);
    this.dataShareSub = this._dataShareService.person.subscribe(res => this.setPersonValue(res));
  }

  public openEditPersonFood(modal): void {
    this._modal.open(modal, { size: 'lg', centered: true}).result.then(
    (save) => {
      this.rsvpHandler.savePersonChanges(this.person);
    }, (dismiss) => {
      this.setPersonValue(this._dataShareService.person.getValue());
    });
  }

  public openCreatePlusOneModal(modal): void {
    this.createEmptyPlusOne();
    this._modal.open(modal, { size: 'lg', centered: true}).result.then(
    (save) => {
      this.rsvpHandler.postPlusOne(this.person, this.plusOne);
    }, (dismiss) => {
      this.person.plusOne = null;
    });
  }

  public openEditPlusOneModal(modal): void {
    this.createCopyOfPlusOne();
    this._modal.open(modal, { size: 'lg', centered: true}).result.then(
      (save) => {
        this.rsvpHandler.savePlusOneChanges(this.person, this.plusOne);
      }, (dismiss) => {
        this.plusOne = null;
    });
  }

  public handlePlusOneOutput(plusOne: IPlusOne) {
    if (!plusOne) {
      this.canSavePlusOneChanges = false;
      return;
    }

    this.canSavePlusOneChanges = true;
    this.plusOne = plusOne;
  }

  public changeFoodSelection(foodIndex: number): void {
    this.person.foodId = this.foods[foodIndex].id;
    this.person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndex: number): void {
    this.plusOne.foodId = this.foods[foodIndex].id;
    this.plusOne.food = this.foods[foodIndex];
  }

  public deletePlusOne(): void {
    this.rsvpHandler.deletePlusOne(this.person);
  }

  public closeEditPage(): void {
    this._dataShareService.changePerson(null);
  }

  private setPersonValue(person: IPerson): void {
    this.person = { ...person };
  }

  private createEmptyPlusOne(): void {
    this.plusOne = {
      id: 0,
      firstName: "",
      lastName: "",
      foodId: 1,
      food: this.foods[0],
      allergy: "",
      hasAllergy: false,
      personId: this.person.id,
      person: this.person
    };
  }

  private createCopyOfPlusOne(): void {
    this.plusOne = { ...this.person.plusOne };
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
    this._dataShareService.changePerson(null);
  }
}

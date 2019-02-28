/* 
  TODO:
    1) Make the selection work with a field rather than the .person.plusOne itself (it will make handling changes much easier)
    2) Rewrite almost all of this
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, DataShareService } from '../services/services';
import { RsvpEditHandler } from './rsvp-edit-handler';
import { IPerson, IPlusOne } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-edit',
  templateUrl: './rsvp-edit.component.html',
  styleUrls: ['./rsvp-edit.component.css', '../global/shared-styles.css']
})
export class RsvpEditComponent implements OnInit {
  private dataShareSub: Subscription;

  rsvpHandler: RsvpEditHandler;
  person: IPerson;
  form: FormGroup;
  createdNewPlusOne: boolean = false;
  selectedFoodIndex: number = 0;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal, private _fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    this.rsvpHandler = new RsvpEditHandler(this._apiService, this._dataShareService);
    this.dataShareSub = this._dataShareService.person.subscribe(res => this.setPersonValue(res));
  }

  public openEditPersonFood(modal): void {
    this._modal.open(modal, { size: 'lg', centered: true}).result.then((r) => {
      this.rsvpHandler.savePersonChanges();
    }, (d) => {
      this.rsvpHandler.setPersonValue(this.person);
    });
  }

  public openEditPlusOneModal(modal): void {
    this._modal.open(modal, { size: 'lg', centered: true}).result.then((r) => {
      if (this.createdNewPlusOne)
        this.rsvpHandler.postPlusOne();
      else
        this.rsvpHandler.savePlusOneChanges();
    }, (d) => {
      this.resetSelectedFoodIndex();
    });
  }

  public changeFoodSelection(foodIndexStr: string): void {
    const index = parseInt(foodIndexStr);

    this.selectedFoodIndex = index;
  }

  public closeEditPage(): void {
    this._dataShareService.changePerson(null);
  }

  private setPersonValue(person: IPerson): void {
    this.person = person;

    if (!this.person) return;

    if (this.person && this.person.hasPlusone && !this.person.plusOne) {
      this.createEmptyPlusOne();
    } else {
      this.resetSelectedFoodIndex();
      this.createdNewPlusOne = false;
    }
  }

  private resetSelectedFoodIndex(): void {
    this.selectedFoodIndex = this.person.plusOne.foodId-1;
    if (this.selectedFoodIndex < 0) this.selectedFoodIndex = 0;
  }

  private createEmptyPlusOne(): void {
    this.person.plusOne = {
      id: 0,
      firstName: "",
      lastName: "",
      hasAllergy: false,
      allergy: "",
      foodId: 1,
      food: this.rsvpHandler.foods[0],
      personId: this.person.id,
      person: this.person
    };

    this.createdNewPlusOne = true;

    this.rsvpHandler.setPersonValue(this.person);
  }

  private createForm(): void {
    this.form = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergy: ['', Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
    this._dataShareService.changePerson(null);
  }
}

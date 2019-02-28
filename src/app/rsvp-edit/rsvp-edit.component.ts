import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal, private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.rsvpHandler = new RsvpEditHandler(this._apiService, this._dataShareService);
    this.dataShareSub = this._dataShareService.person.subscribe(res => this.setPersonValue(res));
  }

  public openEditPersonFood(modal): void {
    this._modal.open(modal, { size: 'lg', centered: true}).result.then(
    (save) => {
      this.rsvpHandler.savePersonChanges(this.person);
    }, (dismiss) => {
      this.person = this._dataShareService.person.getValue();
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

  public changeFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);
    
    this.person.foodId = this.foods[foodIndex].id;
    this.person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndexStr: string): void {
    const foodIndex = parseInt(foodIndexStr);

    this.plusOne.foodId = this.foods[foodIndex].id;
    this.plusOne.food = this.foods[foodIndex];
  }

  public deletePlusOne(): void {
    this.rsvpHandler.deletePlusOne(this.person);
  }

  public getFoodImg(isPlusOne: boolean): string {
    return isPlusOne ? this.plusOne.food.img : this.person.food.img;
  }

  public getFoodDesc(isPlusOne: boolean): string {
    return isPlusOne ? this.plusOne.food.desc : this.person.food.desc;
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

  private createForm(): void {
    this.form = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergy: ['', Validators.pattern(/^([A-Za-z ,])*$/)],
      firstNameEdit: ['Init', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastNameEdit: ['Init', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergyEdit: ['', Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }

  ngOnDestroy() {
    this.dataShareSub.unsubscribe();
    this._dataShareService.changePerson(null);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { DataShareService, ApiService } from '../services/services';
import { IPerson, IFood, IPlusOne } from '../interfaces/interfaces';
import { RsvpHandler } from './rsvp-create-handler';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-create',
  templateUrl: './rsvp-create.component.html',
  styleUrls: ['./rsvp-create.component.css', '../global/shared-styles.css']
})
export class RsvpCreateComponent implements OnInit {
  @Input() foods: IFood[];

  private dataShareSub: Subscription;
  private rsvpHandler: RsvpHandler;
  private maxPage: number = 2; //3 pages max [0-2] (Assuming they have +1)
  
  person: IPerson;
  plusOne: IPlusOne;

  plusOnePage: number = 1;

  form: FormGroup;

  onPage: number = 0;
  backText: string = "Cancel";
  nextText: string = "Next";

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.createForm();
    this.dataShareSub = this._dataShareService.person.subscribe(res => this.setPersonValue(res));
    this.rsvpHandler = new RsvpHandler(this._apiService,this._dataShareService, this._router);
  }

  public nextPage(): void {
    if (this.onPage === this.plusOnePage) {
      this.person.plusOne = this.plusOne;
    }

    if (this.onPage === this.maxPage) {
      this.rsvpHandler.saveRSVP(this.person);
    }

    this.onPage++;
    this.setButtonTexts();
  }

  public lastPage(): void {
    if (this.onPage <= 0)
      this.goBackToSearch();

    this.onPage--;
    this.setButtonTexts();
  }

  public skipPlusOne(): void {
    this.person.plusOne = null;
    this.createEmptyPlusOne(); //On skip reset our local +1
    this.onPage++;
    this.setButtonTexts();
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

  public enterKeyPressedOnAddPlusOne(): void {
    if (this.form.valid)
      this.nextPage();
  }

  public getFoodImg(isPlusOne: boolean): string {
    return isPlusOne? this.plusOne.food.img : this.person.food.img;
  }

  public getFoodDesc(isPlusOne: boolean): string {
    return isPlusOne ? this.plusOne.food.desc : this.person.food.desc;
  }

  private setPersonValue(person: IPerson): void {
    if (!person) return;

    this.person = { ...person };

    if (this.person.hasPlusone)
      this.createEmptyPlusOne();      
    else
      this.maxPage--;
  }

  private createEmptyPlusOne(): void {
    this.plusOne = {
      id: 0,
      firstName: "",
      lastName: "",
      hasAllergy: false,
      allergy: "",
      foodId: 1,
      food: this.foods[0],
      personId: this.person.id,
      person: this.person
    };
  }

  private goBackToSearch(): void {
    this.person = null;
    this._dataShareService.changePerson(this.person);
  }

  private setButtonTexts(): void {
    this.nextText = this.onPage < this.maxPage ? "Next" : "Confirm";
    this.backText = this.onPage > 0 ? "Back" : "Cancel";
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
  }
}

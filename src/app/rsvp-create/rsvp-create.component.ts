import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { DataShareService, ApiService } from '../services/services';
import { IPerson } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { RsvpHandler } from './rsvp-create-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp-create',
  templateUrl: './rsvp-create.component.html',
  styleUrls: ['./rsvp-create.component.css', '../global/shared-styles.css']
})
export class RsvpCreateComponent implements OnInit {
  private person: IPerson;
  private rsvpHandler: RsvpHandler;
  private maxPage: number = 3; //4 pages max (Assuming they have +1)
  
  form: FormGroup;

  loading: boolean = false;
  nameSearchValue: string = "";
  searchErrorMessage: string = "";

  onPage: number = 0;
  backText: string = "Cancel";
  nextText: string = "Next";

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _fb: FormBuilder, private _router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    this._dataShareService.person.subscribe(res => this.setPersonValue(res));
    this.rsvpHandler = new RsvpHandler(this._apiService,this._dataShareService, this._router);
  }

  public searchForPerson(): void {
    if (!this.nameSearchValue)
      return;

    this.searchErrorMessage = "";
    this.loading = true;

    let s: Subscription = this._apiService.lookupRSVP(this.nameSearchValue).subscribe(
      d => this._dataShareService.changePerson(d),
      err => {
        this.searchErrorMessage = err.error['Error'][0];
        this.loading = false;
      },
      () => {
        s.unsubscribe();
        this.loading = false;
        this.onPage++;
      }
    );
  }

  public clearSearch(): void {
    this.person = null;
    this.nameSearchValue = "";
    this.onPage = 0;
    this.maxPage = 3;
  }

  public nextPage(): void {
    this.onPage++;

    if (this.onPage > this.maxPage) {
      this.rsvpHandler.saveRSVP();
    }

    this.nextText = this.onPage < this.maxPage ? "Next" : "Save";
    this.backText = this.onPage > 1 ? "Back" : "Cancel";
    
  }

  public lastPage(): void {
    this.onPage--;

    if (this.onPage <= 0)
      this.clearSearch();
    
      //If the user has a plus one and hits back (leading us back to the +1 screen) and currently does not have one, create one
    if (this.onPage == 2 && this.person.hasPlusone && !this.person.plusOne) //dirty
      this.createEmptyPlusOne();
    
    this.nextText = this.onPage < this.maxPage ? "Next" : "Save";
    this.backText = this.onPage > 1 ? "Back" : "Cancel";
  }

  public skipPlusOne(): void {
    this.rsvpHandler.shouldAddPlusOne = false;
    this.person.plusOne = null;
    this.nextPage();
  }

  public enterKeyPressedOnAddPlusOne(): void {
    if (this.form.valid)
      this.nextPage();
  }

  private setPersonValue(person: IPerson): void {
    this.person = person;

    if (this.person !== null) {
      this.maxPage = this.person.hasPlusone ? this.maxPage : this.maxPage - 1;

      if (this.person.hasPlusone && !this.person.plusOne)
        this.createEmptyPlusOne();
    }
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
  }

  private createForm(): void {
    this.form = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergy: ['', Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }

  ngOnDestroy() {
    this._dataShareService.changePerson(null);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHandler } from './modal-handler';
import { ApiService, DataShareService } from '../services/services';
import { IPerson, IFood, IMessageType } from '../interfaces/interfaces';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css', '../global/shared-styles.css']
})
export class RsvpComponent implements OnInit {
  modalHandler: ModalHandler;
  loading: boolean = false;
  nameSearchValue: string = "";
  searchError: string = "";
  person: IPerson;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal) { }

  ngOnInit() { 
    this._dataShareService.person.subscribe(res => this.setUpdatedPerson(res));
    this.modalHandler = new ModalHandler(this._apiService, this._dataShareService);
  }

  private setUpdatedPerson(person: IPerson): void {
    this.person = person;
  }

  public searchForPerson(): void {
    if (!this.nameSearchValue)
      return;


    this.searchError = "";
    this.loading = true;

    let s: Subscription = this._apiService.lookupRSVP(this.nameSearchValue).subscribe(
      d => this._dataShareService.changePerson(d),
      err => {
        this.searchError = err.error['Error'][0];
        this.loading = false;
      },
      () => {
        s.unsubscribe();
        this.loading = false;
      }
    );
  }

  public addNewPlusOne(modal): void {
    this.person.plusOne = {
      id: -1,
      firstName: "",
      lastName: "",
      hasAllergy: false,
      allergy: "",
      foodId: 1,
      food: this.modalHandler.foods[0],
      personId: this.person.id,
      person: null
    }

    this.modalHandler.addPlusOne = true;
    this.openModal(modal);
  }

  public openModal(modal): void {
    //this.modalHandler.person = this.person;
    this._modal.open(modal, { size: 'lg', centered: true }).result.then((result) => {
      //Close via save
    }, (reason) => {
      //Close via dismiss or click off
      this.modalHandler.getPerson();
      this.displayToaster("Changes", "Not Saved", IMessageType.Notification);
    });
  }

  public openConfirmDeleteModal(modal): void {
    this._modal.open(modal, { centered: true }).result.then((result) => {
      this.modalHandler.deletePlusOne();
    });
  }

  public clearSearch(): void {
    this.person = null;
    this.nameSearchValue = "";
  }

  public isSaveEnabled() {
    return this.person.plusOne.firstName.trim().length > 0 && this.person.plusOne.lastName.trim().length > 0;
  }
  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }

  ngOnDestroy() {
    this._dataShareService.changePerson(null);
  }
}

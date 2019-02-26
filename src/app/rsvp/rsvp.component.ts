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

  foods: Observable<IFood[]>;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal) { }

  ngOnInit() { 
    this.modalHandler = new ModalHandler(this._apiService, this._dataShareService);

    //TODO: REMOVE BELOW BEFORE PUSHING
    //this.nameSearchValue="test person";
    //this.searchForPerson();
  }

  public searchForPerson(): void {
    if (!this.nameSearchValue)
      return;


    this.searchError = "";
    this.loading = true;

    let s: Subscription = this._apiService.lookupRSVP(this.nameSearchValue).subscribe(
      d => this.person = d,
      err => {
        this.searchError = err.error['Error'][0];
        this.loading = false;
      },
      () => {
        s.unsubscribe();
        this.loading = false;
        this.modalHandler.person = this.person;
      }
    )
  }

  public resetPersonValues(): void {
    this.modalHandler.person = this.person;
    this.displayToaster("Changes", "Not Saved", IMessageType.Notification);
  }

  public clearSearch(): void {
    this.person = null;
    this.nameSearchValue = "";
  }

  public openModal(modal): void {
    this.modalHandler.person = this.person;
    this._modal.open(modal, { size: 'lg' });
  }

  private displayToaster(message: string, action: string, mType: IMessageType): void {
    this._dataShareService.changeMessage({ message: message, action: action, mType: mType });
  }
}

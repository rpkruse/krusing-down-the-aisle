import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHandler } from './modal-handler';
import { ApiService } from '../services/services';
import { IPerson, IFood } from '../interfaces/interfaces';
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

  constructor(private _apiService: ApiService, private _modal: NgbModal) { }

  ngOnInit() { 
    this.modalHandler = new ModalHandler(this._apiService);

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
  }

  public clearSearch(): void {
    this.person = null;
    this.nameSearchValue = "";
  }

  public openModal(modal): void {
    this.modalHandler.person = this.person;
    this._modal.open(modal, { size: 'lg' });
  }
}

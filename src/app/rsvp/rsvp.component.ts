import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, DataShareService } from '../services/services';
import { IPerson } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css', '../global/shared-styles.css']
})
export class RsvpComponent implements OnInit {
  loading: boolean = false;
  nameSearchValue: string = "";
  searchError: string = "";
  person: IPerson;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _modal: NgbModal) { }

  ngOnInit() { 
    this._dataShareService.person.subscribe(res => this.setUpdatedPerson(res));
    //this.nameSearchValue = "test person5";
    //this.searchForPerson();
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

  public clearSearch(): void {
    this.person = null;
    this.nameSearchValue = "";
  }

  private setUpdatedPerson(person: IPerson): void {
    if (!person)
      this.clearSearch();

    this.person = person;
  }

  ngOnDestroy() {
    this._dataShareService.changePerson(null);
  }
}

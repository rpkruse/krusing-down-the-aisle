import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, DataShareService } from '../services/services';
import { IPerson, IFood } from '../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css', '../global/shared-styles.css']
})
export class RsvpComponent implements OnInit {
  private dataShareSub: Subscription;

  foods: IFood[] = [];
  loading: boolean = false;
  nameSearchValue: string = "";
  searchError: string = "";
  person: IPerson;

  constructor(private _apiService: ApiService, private _dataShareService: DataShareService, private _routeData: ActivatedRoute) { }

  ngOnInit() { 
    this.dataShareSub = this._dataShareService.person.subscribe(res => this.setUpdatedPerson(res));
    this.foods = this._routeData.snapshot.data['foods'];
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
    this.loading = false;

    if (!person)
      this.clearSearch();

    this.person = person;
  }

  ngOnDestroy() {
    this._dataShareService.changePerson(null);
    this.dataShareSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Food, Person } from 'src/app/shared-module/models';
import { RsvpService, SharedDataService } from '../../services';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit, OnDestroy {
  private dataShareSub: Subscription;

  loading: boolean;

  foods: Observable<Food[]>;
  person: Person;
  nameSearchValue: string;
  searchError: string;

  constructor(private rsvpService: RsvpService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.loading = false;
    this.nameSearchValue = '';
    this.searchError = '';

    this.foods = this.rsvpService.getAllFood();
    this.dataShareSub = this.sharedDataService.person.subscribe(res => this.setPerson(res));
  }

  searchForPerson(): void {
    if (!this.nameSearchValue) return;

    this.searchError = '';
    this.loading = true;

    const s: Subscription = this.rsvpService.lookupRSVP(this.nameSearchValue).subscribe(
      d => this.sharedDataService.changePerson(d),
      err => {
        this.searchError = err.error['Error'][0];
        this.nameSearchValue = '';
        this.loading = false;
      },
      () => {
        s.unsubscribe();
        this.loading = false;
      }
    );
  }

  setPerson(person: Person): void {
    if (!person) this.nameSearchValue = '';

    this.person = person;
  }

  ngOnDestroy() {
    this.sharedDataService.clearData();
    this.dataShareSub.unsubscribe();
  }
}

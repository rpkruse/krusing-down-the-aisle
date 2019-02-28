import { Component, OnInit } from '@angular/core';
import { IWeddingParty } from '../interfaces/interfaces';
import { ApiService } from '../services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wedding-party',
  templateUrl: './wedding-party.component.html',
  styleUrls: ['./wedding-party.component.css', '../global/shared-styles.css']
})
export class WeddingPartyComponent implements OnInit {
  private pullCount: number = 0;

  bridalParty:IWeddingParty[] = [];
  groomsParty: IWeddingParty[] = [];

  loading: boolean = true;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    let s: Subscription, j: Subscription;

    s = this._apiService.getAllEntities<IWeddingParty>('WeddingParty/BridalParty').subscribe(
      d => this.bridalParty = d,
      err => console.log('unable to get bridal party', err),
      () => {
        s.unsubscribe();
        this.pullCount++;
        this.loading = this.pullCount != 2;
      }
    );

    j = this._apiService.getAllEntities<IWeddingParty>('WeddingParty/GroomsParty').subscribe(
      d => this.groomsParty = d,
      err => console.log('unable to get grooms party', err),
      () => {
        j.unsubscribe();
        this.pullCount++;
        this.loading = this.pullCount != 2;
      }
    );
  }

}

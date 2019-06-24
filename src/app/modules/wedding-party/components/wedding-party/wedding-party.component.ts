import { Component, OnInit } from '@angular/core';
import { WeddingParty } from 'src/app/shared-module/models';
import { Observable, forkJoin } from 'rxjs';
import { WeddingPartyService } from '../../services';

@Component({
  selector: 'app-wedding-party',
  templateUrl: './wedding-party.component.html',
  styleUrls: ['./wedding-party.component.scss']
})
export class WeddingPartyComponent implements OnInit {
  wholeParty: WeddingParty[] = [];
  loading: boolean;

  constructor(private weddingPartyService: WeddingPartyService) { }

  ngOnInit() {
    this.loading = true;
    
    const apiCalls: Observable<WeddingParty[]>[] = [
      this.weddingPartyService.getBridalParty(),
      this.weddingPartyService.getGroomsParty()
    ];

    forkJoin(apiCalls).subscribe(weddingParty => {
      const len = weddingParty[0].length;

      for (let i = 0; i < len; i++) {
        this.wholeParty.push(weddingParty[0][i]);
        this.wholeParty.push(weddingParty[1][i]);
      }

      this.loading = false;
    });
  }

}

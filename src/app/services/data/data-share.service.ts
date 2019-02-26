import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';

import { IMessageOutput } from '../../interfaces/interfaces';

@Injectable()
export class DataShareService {
  public message: Subject<IMessageOutput> = new BehaviorSubject<IMessageOutput>(null);

  public changeMessage(message: IMessageOutput): void {
    this.message.next(message);
  }

  public clearAllData(): void {
    this.message.next(null);
  }
}
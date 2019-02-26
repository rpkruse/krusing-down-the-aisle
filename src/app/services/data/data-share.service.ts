import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';

import { IPerson, IMessageOutput } from '../../interfaces/interfaces';

@Injectable()
export class DataShareService {
  public person: Subject<IPerson> = new BehaviorSubject<IPerson>(null);
  public message: Subject<IMessageOutput> = new BehaviorSubject<IMessageOutput>(null);

  public changePerson(person: IPerson): void {
    this.person.next(person);
  }

  public changeMessage(message: IMessageOutput): void {
    this.message.next(message);
  }

  public clearAllData(): void {
    this.person.next(null);
    this.message.next(null);
  }
}
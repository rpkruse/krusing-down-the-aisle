import { Observable } from 'rxjs';

export interface IApiService {
  getSingleEntity<T>(path: string, id: number): Observable<T>;
  getAllEntities<T>(path: string): Observable<T[]>;
  putEntity<T>(path: string, id: number, entity: Object): Observable<T>;
}
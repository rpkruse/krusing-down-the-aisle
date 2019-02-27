import { IFood } from './food.interface';
import { IPerson } from './person.interface';

export interface IPlusOne {
  id: number,
  firstName: string,
  lastName: string,
  hasAllergy: boolean,
  allergy: string,
  foodId: number,
  personId: number,
  food: IFood
  person: IPerson
}
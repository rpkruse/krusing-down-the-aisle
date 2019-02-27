import { IPlusOne } from './plusone.interface';
import { IFood } from './food.interface';

export interface IPerson {
  id: number,
  firstName: string,
  lastName: string,
  hasPlusone: boolean,
  foodId: number,
  hasAllergy: boolean,
  allergy: string,
  hasRSVPD: boolean,
  food: IFood,
  plusOne: IPlusOne
}
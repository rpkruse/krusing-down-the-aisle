import { IPlusOne } from './plusone.interface';
import { IFood } from './food.interface';

export interface IPerson {
  id: number,
  firstName: string,
  lastName: string,
  hasPlusone: boolean,
  foodId: number,
  plusOneId: number,
  hasAllergy: boolean,
  allergy: string,
  food: IFood,
  plusOne: IPlusOne
}
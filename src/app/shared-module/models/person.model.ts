import { Food } from './food.model';
import { PlusOne } from './plus-one.model';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  hasPlusone: boolean;
  foodId: number;
  hasAllergy: boolean;
  allergy: string;
  hasRSVPD: boolean;
  food: Food;
  plusOne: PlusOne;
}

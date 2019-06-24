import { Food } from './food.model';
import { Person } from './person.model';

export interface PlusOne {
  id: number;
  firstName: string;
  lastName: string;
  hasAllergy: boolean;
  allergy: string;
  foodId: number;
  personId: number;
  food: Food;
  person: Person;
}

import { Food } from './food.model';
import { Person } from './person.model';

export interface PartyMember {
    id: number;
    firstName: string;
    lastName: string;
    personId: number;
    foodId: number;
    hasAllergy: boolean;
    allergy: string;
    food: Food;
    person: Person;
}
import { Food } from './food.model';
import { PlusOne } from './plus-one.model';
import { PartyMember } from './party-member.model';

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
  canAttend: boolean;
  partyMembers?: PartyMember[];
}

import { IFood } from './food.interface';

export interface IPlusOne {
  id: number,
  firstName: string,
  lastName: string,
  foodId: number,
  food: IFood
}
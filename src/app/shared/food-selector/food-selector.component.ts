import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFood } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-food-selector',
  templateUrl: './food-selector.component.html',
  styleUrls: ['./food-selector.component.css', '../../global/shared-styles.css']
})
export class FoodSelectorComponent implements OnInit {

  @Input() foods: IFood[];
  @Input() food: IFood;
  @Output() selectedFoodIndexOutput: EventEmitter<number> = new EventEmitter<number>();

  selectedFoodIndex: number = 0;

  constructor() { }

  ngOnInit() {
    this.selectedFoodIndex = this.food.id - 1;
    
    if (this.selectedFoodIndex < 0) 
      this.selectedFoodIndex = 0;
  }

  public changeFoodSelection(indexStr: string): void {
    this.selectedFoodIndex = parseInt(indexStr);

    this.selectedFoodIndexOutput.emit(this.selectedFoodIndex);
  }

  public getFoodImg(): string {
    return this.foods[this.selectedFoodIndex].img;
  }

  public getFoodDesc(): string {
    return this.foods[this.selectedFoodIndex].desc;
  }
}

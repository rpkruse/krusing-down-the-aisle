import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../../models';

@Component({
  selector: 'app-food-selector',
  templateUrl: './food-selector.component.html',
  styleUrls: ['./food-selector.component.scss']
})
export class FoodSelectorComponent implements OnInit {
  @Input() foods: Food[];
  @Input() food: Food;
  @Output() selectedFoodIndexOutput: EventEmitter<number> = new EventEmitter<number>();

  selectedFoodIndex: number;

  constructor() { }

  ngOnInit() {
    this.selectedFoodIndex = this.food.id - 1;

    if (this.selectedFoodIndex < 0) this.selectedFoodIndex = 0;
  }

  changeFoodSelection(indexStr: string): void {
    this.selectedFoodIndex = parseInt(indexStr, 10);
    this.selectedFoodIndexOutput.emit(this.selectedFoodIndex);
  }

  getFoodImg(): string {
    return this.foods[this.selectedFoodIndex].img;
  }

  getFoodDesc(): string {
    return this.foods[this.selectedFoodIndex].desc;
  }
}

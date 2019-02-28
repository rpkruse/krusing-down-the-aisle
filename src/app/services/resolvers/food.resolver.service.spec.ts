import { TestBed } from '@angular/core/testing';

import { FoodResolver } from './food.resolver.service';

describe('FoodResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodResolver = TestBed.get(FoodResolver);
    expect(service).toBeTruthy();
  });
});

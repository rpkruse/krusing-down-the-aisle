import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpCreateComponent } from './rsvp-create.component';

describe('RsvpCreateComponent', () => {
  let component: RsvpCreateComponent;
  let fixture: ComponentFixture<RsvpCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

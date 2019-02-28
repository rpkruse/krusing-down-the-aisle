import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpEditComponent } from './rsvp-edit.component';

describe('RsvpEditComponent', () => {
  let component: RsvpEditComponent;
  let fixture: ComponentFixture<RsvpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

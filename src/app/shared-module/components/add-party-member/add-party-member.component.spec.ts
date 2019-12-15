import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartyMemberComponent } from './add-party-member.component';

describe('AddPartyMemberComponent', () => {
  let component: AddPartyMemberComponent;
  let fixture: ComponentFixture<AddPartyMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartyMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

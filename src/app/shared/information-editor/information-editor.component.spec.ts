import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationEditorComponent } from './information-editor.component';

describe('InformationEditorComponent', () => {
  let component: InformationEditorComponent;
  let fixture: ComponentFixture<InformationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

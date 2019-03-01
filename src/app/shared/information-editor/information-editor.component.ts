import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { IPlusOne } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-information-editor',
  templateUrl: './information-editor.component.html',
  styleUrls: ['./information-editor.component.css', '../../global/shared-styles.css']
})
export class InformationEditorComponent implements OnInit {
  
  @Input() plusOne: IPlusOne;
  @Output() plusOneOutput: EventEmitter<IPlusOne> = new EventEmitter<IPlusOne>();

  plusOneForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public setFirstName(fn: string): void {
    this.plusOne.firstName = fn;
    this.outputPlusOne();
  }

  public setLastName(ln: string): void {
    this.plusOne.lastName = ln;
    this.outputPlusOne();
  }

  public setAllergy(allergy: string): void {
    this.plusOne.allergy = allergy;
    this.outputPlusOne();
  }

  private outputPlusOne(): void {
    if (this.plusOneForm.valid)
      this.plusOneOutput.emit(this.plusOne);
    else
      this.plusOneOutput.emit(null);
  }

  private createForm(): void {
    this.plusOneForm = this._fb.group({
      firstNameEdit: [this.plusOne.firstName, [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastNameEdit: [this.plusOne.lastName, [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergyEdit: ['', Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlusOne } from '../../models';

@Component({
  selector: 'app-information-editor',
  templateUrl: './information-editor.component.html',
  styleUrls: ['./information-editor.component.scss']
})
export class InformationEditorComponent implements OnInit {
  private _plusOne: PlusOne;

  @Input() set plusOne(po: PlusOne) {
    this._plusOne = po;
    this.createForm();
  }
  @Output() plusOneOutput: EventEmitter<PlusOne> = new EventEmitter<PlusOne>();

  infoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  checkFormValidity(): void {
    if (this.infoForm.valid) {
      this._plusOne.firstName = this.infoForm.controls['firstName'].value;
      this._plusOne.lastName = this.infoForm.controls['lastName'].value;
      this._plusOne.allergy = this.infoForm.controls['allergy'].value;

      if (this._plusOne.allergy.length) this._plusOne.hasAllergy = true;

      this.outputPlusOne();
    } else {
      this.plusOneOutput.emit(null);
    }
  }

  outputPlusOne(): void {
    if (this.infoForm.valid)
      this.plusOneOutput.emit(this._plusOne);
  }

  getInputValidationClass(inputField: string): string {
    return (this.infoForm.controls[inputField].errors) ? 'is-invalid' : 'is-valid';
  }

  inputHasError(inputField: string, error: string): boolean {
    return this.infoForm.controls[inputField].hasError(error) && (this.infoForm.controls[inputField].dirty || this.infoForm.controls[inputField].touched);
  }

  private createForm(): void {
    this.infoForm = this.fb.group({
      firstName: [this._plusOne.firstName, [Validators.required, Validators.pattern(/^([A-Za-z])*$/)]],
      lastName: [this._plusOne.lastName, [Validators.required, Validators.pattern(/^([A-Za-z])*$/)]],
      allergy: [this._plusOne.allergy, Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }
}

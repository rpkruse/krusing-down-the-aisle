import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlusOne } from '../../models';

@Component({
  selector: 'app-information-editor',
  templateUrl: './information-editor.component.html',
  styleUrls: ['./information-editor.component.scss']
})
export class InformationEditorComponent implements OnInit {
  @Input() plusOne: PlusOne;
  @Output() plusOneOutput: EventEmitter<PlusOne> = new EventEmitter<PlusOne>();

  infoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  checkFormValidity(): void {
    if (this.infoForm.valid) {
      this.plusOne.firstName = this.infoForm.controls['firstName'].value;
      this.plusOne.lastName = this.infoForm.controls['lastName'].value;
      this.plusOne.allergy = this.infoForm.controls['allergy'].value;

      if (this.plusOne.allergy.length) this.plusOne.hasAllergy = true;

      this.outputPlusOne();
    } else {
      this.plusOneOutput.emit(null);
    }
  }

  outputPlusOne(): void {
    if (this.infoForm.valid)
      this.plusOneOutput.emit(this.plusOne);
  }

  getInputValidationClass(inputField: string): string {
    return (this.infoForm.controls[inputField].errors) ? 'is-invalid' : 'is-valid';
  }

  inputHasError(inputField: string, error: string): boolean {
    return this.infoForm.controls[inputField].hasError(error) && (this.infoForm.controls[inputField].dirty || this.infoForm.controls[inputField].touched);
  }

  private createForm(): void {
    console.log(this.plusOne);
    this.infoForm = this.fb.group({
      firstName: [this.plusOne.firstName, [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      lastName: [this.plusOne.lastName, [Validators.required, Validators.pattern(/^([A-Z]{1})([A-Za-z])*$/)]],
      allergy: ['', Validators.pattern(/^([A-Za-z ,])*$/)]
    });
  }
}

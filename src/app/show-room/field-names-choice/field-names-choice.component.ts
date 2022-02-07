import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-field-names-choice',
  templateUrl: './field-names-choice.component.html',
  styleUrls: ['./field-names-choice.component.css']
})
export class FieldNamesChoiceComponent implements OnInit {

  @Input() fieldNames: Array<string> = [];

  // @ts-ignore

  selectedFieldsForm: FormArray;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.selectedFieldsForm = this.fb.array([])
    this.createForm(this.fieldNames);
  }

  createForm(fieldNames: Array<string>): void {
    fieldNames.map(
      fieldName => {
        this.fieldNameFormFields.push(
          this.fb.control(`${fieldName}`)
        )
      }
    )
  }

  get fieldNameFormFields(): FormArray {
    return this.selectedFieldsForm as FormArray
  }
}

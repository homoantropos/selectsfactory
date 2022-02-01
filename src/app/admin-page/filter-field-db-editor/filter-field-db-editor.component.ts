import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../shared/services/filterRequetsServise";

@Component({
  selector: 'app-filter-field-db-editor',
  templateUrl: './filter-field-db-editor.component.html',
  styleUrls: ['./filter-field-db-editor.component.css']
})
export class FilterFieldDbEditorComponent implements OnInit {

  @Input() fieldName: string = '';
  // @ts-ignore
  filterFieldEditorForm: FormGroup;
  edit = false;

  constructor(
    private fb: FormBuilder,
    private dbService: FilterRequestService
  ) {
  }

  ngOnInit(): void {
    if (this.fieldName.length > 0) {
      this.dbService.getFilterFieldByKey(this.fieldName)
        .subscribe(
          response => {
            if (typeof response === "string") {
              alert(response);
            } else {
              this.createForm(response);
            }
          }
        )
    } else {
      this.createForm();
    }

  }

  createForm(value?: FilterFieldModel | null): void {
    let valueOptions = this.fb.array([]);
    if (value) {
      value.valueOptions.map(
        valueOption => {
          valueOptions.push(this.fb.group({
              value: [valueOption.value],
              option: [valueOption.option]
            })
          );
        }
      );
    } else {
      valueOptions.push(this.fb.group(
        {
          value: [''],
          option: ['']
        }
      ))
    }
    this.filterFieldEditorForm = this.fb.group({
      fieldName: [value ? value.fieldName : '', Validators.required],
      initValue: [value ? value.initValue : ''],
      valueOptions: valueOptions
    })

    console.log(this.filterFieldEditorForm.value)
  }

  addValueOption(value: string, option: string): void {
    this.filterFieldEditorForm.value.valueOptions.add(
      this.fb.control({
        value: [value, Validators.required],
        option: [option, Validators.required]
      })
    )
  }

  getValueOptionsArray(): FormArray {
    return this.filterFieldEditorForm.controls['valueOptions'] as FormArray;
  }
  onSubmit(): void {

  }

}

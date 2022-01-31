import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../services/filterRequetsServise";

@Component({
  selector: 'app-filter-field-db-editor',
  templateUrl: './filter-field-db-editor.component.html',
  styleUrls: ['./filter-field-db-editor.component.css']
})
export class FilterFieldDbEditorComponent implements OnInit {

  // @ts-ignore
  filterFieldEditorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbService: FilterRequestService
  ) {
  }

  ngOnInit(): void {
    this.dbService.getFilterFieldByKey(
      'direction')
      .subscribe(
        response => {
          if (typeof response === "string") {
            console.log(response)
          } else {
            this.createForm({
              fieldName: response.fieldName,
              initValue: response.initValue,
              valueOptions: response.valueOptions
            })
          }
          console.log(this.filterFieldEditorForm.value);
        }
      )
  }

  createForm(value: FilterFieldModel): void {
    const valueOptions: Array<{ value: string, option: string }> = [];
    value.valueOptions.map(
      valueOption => {
        valueOptions.push({
          value: valueOption.value,
          option: valueOption.option
        });
        this.filterFieldEditorForm = this.fb.group({
          fieldName: [value.fieldName, Validators.required],
          initValue: [value.initValue, Validators.required],
          valueOptions: this.fb.array(valueOptions)
        })
      }
    );
  }

}

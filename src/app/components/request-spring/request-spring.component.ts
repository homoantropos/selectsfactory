import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FilterRequest, FilterRequestInitValue, SelectInitOptions} from "../../shared/config/types";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-request-spring',
  templateUrl: './request-spring.component.html',
  styleUrls: ['./request-spring.component.css']
})

export class RequestSpringComponent implements OnInit, OnChanges {
  // @ts-ignore
  @Input() filterRequestInitValue: FilterRequestInitValue;
  @Output() filterRequest: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();

  // @ts-ignore
  filterRequestForm: FormGroup;
  filterRequestFormValues: Array<FilterRequest> = [];
  // @ts-ignore
  formControlNames: Array<string>;
  selectOptions: SelectInitOptions = [];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    Object.keys(changes.filterRequestInitValue.currentValue).map(
      key => {
        // @ts-ignore
        this.filterRequestInitValue[key] = changes.filterRequestInitValue.currentValue[key];
      }
    );
    Object.keys(this.filterRequestInitValue).map(
      key => {
        if(!changes.filterRequestInitValue.currentValue[key]) {
          delete this.filterRequestInitValue[key];
        }
      }
    )
    console.log(this.filterRequestInitValue);
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.filterRequestForm = this.createForm(this.filterRequestInitValue);
    this.formControlNames = Object.keys(this.filterRequestFormValues);
  }

  fetchRequest(value: FilterRequest): void {
    this.filterRequest.emit(value);
  }

  createForm(filterRequestInitValue: FilterRequestInitValue): FormGroup {
    Object.keys(filterRequestInitValue)
      .map(
        key => {
          // @ts-ignore
          this.filterRequestFormValues[key] = filterRequestInitValue[key].initValue;
          // @ts-ignore
          this.selectOptions[key] = filterRequestInitValue[key].valueOptions;
        }
      );
    return this.formBuilder.group(this.filterRequestFormValues);
  }

}

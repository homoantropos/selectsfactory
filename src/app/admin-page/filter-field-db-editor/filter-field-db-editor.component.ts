import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../shared/services/filterRequetsServise";
import {switchMap} from "rxjs/operators";
import {AdminMiddleware} from "../../shared/services/admin-middleware";

@Component({
  selector: 'app-filter-field-db-editor',
  templateUrl: './filter-field-db-editor.component.html',
  styleUrls: ['./filter-field-db-editor.component.css']
})

export class FilterFieldDbEditorComponent implements OnInit, OnDestroy {

  @Input() fieldName: string = '';
  @Output() hideMe: EventEmitter<boolean> = new EventEmitter<boolean>()
  // @ts-ignore
  @ViewChild('nameInput') private nameInput: ElementRef;
  // @ts-ignore
  @ViewChild('lastOne') private newInputForFocus: ElementRef;
  // @ts-ignore
  filterFieldEditorForm: FormGroup;
  edit = true;

  constructor(
    private fb: FormBuilder,
    private dbService: FilterRequestService,
    public admin: AdminMiddleware
  ) {
  }

  ngOnInit(): void {
    if (this.fieldName.length > 0 && this.fieldName !== 'close editor') {
      this.edit = false;
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
      this.edit = true;
      this.createForm();
      setTimeout(() => this.nameInput.nativeElement.focus(), 0);
    }
  }

  createForm(value?: FilterFieldModel | null): void {
    this.filterFieldEditorForm = this.fb.group({
      fieldName: [value ? value.fieldName : '', Validators.required],
      initValue: [value ? value.initValue : ''],
      valueOptions: this.fb.array([])
    })
    if (value) {
      value.valueOptions.map(
        valueOption => {
          this.addValueOption(
            valueOption.value,
            valueOption.option
          );
        }
      );
    } else {
      this.addValueOption('', '');
    }
  }

  addValueOption(value: string, option: string): void {
    this.getValueOptionsArray().push(
      this.fb.group({
        value: [value],
        option: [option, Validators.required]
      })
    )
    if (this.newInputForFocus) {
      setTimeout(() => this.newInputForFocus.nativeElement.focus(), 0);
    }
  }

  removeValueOption(index: number): void {
    this.getValueOptionsArray().removeAt(index)
  }

  removeField(): void {
    this.dbService.removeField(this.fieldName)
      .pipe(
        switchMap(fields => {
          this.admin.setFields(fields);
          this.fieldName = '';
          return this.dbService.getFullRequest();
        }),
        switchMap(
          filterRequestInitValue => {
            this.admin.setFilterRequestInitValue(filterRequestInitValue);
            if(this.admin.dbIsEmpty()){
              this.edit = true;
            }
            return this.dbService.getFieldsName();
          }
        )
      )
      .subscribe(
        fieldsName => {
          this.admin.setFieldNames(fieldsName);
          this.createForm();
          const button = document.getElementById(
            'loadReqSpring'
          );
          if (button) {
            button.click();
          }
          this.hideMe.emit(true);
        }
      )
  }

  getValueOptionsArray(): FormArray {
    return this.filterFieldEditorForm.controls['valueOptions'] as FormArray;
  }

  onSubmit(value: FilterFieldModel): void {
    this.fieldName = value.fieldName;
    this.dbService.createField(value)
      .pipe(
        switchMap(
          (fields) => {
            this.admin.setFields(fields);
            return this.dbService.getFieldsName()
          }
        ),
        switchMap(
          (fieldsName) => {
            this.admin.setFieldNames(fieldsName);
            return this.dbService.getFullRequest()
          }
        )
      )
      .subscribe(
        filterRequestInitValue => {
          this.admin.setFilterRequestInitValue(filterRequestInitValue);
          this.edit = false;
          const button = document.getElementById('loadReqSpring');
          if (button) button.click();
        }
      )
  }

  ngOnDestroy(): void {
    this.edit = true;
    this.hideMe.emit(true);
  }
}

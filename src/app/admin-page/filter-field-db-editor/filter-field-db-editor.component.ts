import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  @ViewChild('nameInput') private nameInput: ElementRef;
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
        value: [value, Validators.required],
        option: [option, Validators.required]
      })
    )
  }

  getValueOptionsArray(): FormArray {
    return this.filterFieldEditorForm.controls['valueOptions'] as FormArray;
  }

  onSubmit(value: FilterFieldModel): void {
    this.dbService.createField(value)
      .subscribe(
        () => {
          this.edit = !this.edit;
        }
      )
  }

  changeEdit(): void {
    this.edit = true;
    setTimeout(() => this.nameInput.nativeElement.focus(), 0);
  }
}

import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../shared/services/filterRequetsServise";
import {FilterRequestInitValue} from "../../shared/config/types";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})

export class FilterFieldsDashboardComponent implements OnInit {

  static _fields: Array<FilterFieldModel> = [];

  get fields() {
    return FilterFieldsDashboardComponent._fields;
  }

  static setFields(fields: Array<FilterFieldModel>): void {
    FilterFieldsDashboardComponent._fields = [...fields];
  }

  static _filterRequestInitValue: FilterRequestInitValue = {};

  get filterRequestInitValue(): FilterRequestInitValue {
    return FilterFieldsDashboardComponent._filterRequestInitValue
  }

  setFilterRequestInitValue(filterRequestInitValue: FilterRequestInitValue) {
    FilterFieldsDashboardComponent._filterRequestInitValue = filterRequestInitValue;
  }

  @Input() field: string = '';
  emptyDBMessage = '';
  showEditor = false;

  constructor(
    private frs: FilterRequestService,
    private changeDetect: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.frs.getFilterFields().pipe(
      switchMap(
        response => {
          if (typeof response !== 'string') {
            FilterFieldsDashboardComponent._fields = response
          } else {
            this.emptyDBMessage = response;
          }
          return this.frs.getRequest()
        }
      )
    )
      .subscribe(
        filterRequestInitValue => this.setFilterRequestInitValue(filterRequestInitValue)
      );
  }

  editField(fieldName: string): void {
    this.showEditor = !this.showEditor;
    this.field = fieldName;
    this.changeDetect.detectChanges();
    this.showEditor = true;
  }

}

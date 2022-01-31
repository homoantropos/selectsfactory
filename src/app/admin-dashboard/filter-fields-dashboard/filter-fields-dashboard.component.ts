import {Component, Input, OnInit} from '@angular/core';
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../services/filterRequetsServise";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})
export class FilterFieldsDashboardComponent implements OnInit {

  // @ts-ignore
  field: string;
  fields: Array<FilterFieldModel> = [];
  details = false;

  constructor(
    private frs: FilterRequestService
  ) { }

  ngOnInit(): void {
    this.frs.getFilterFields()
      .subscribe(
        responce => {
          if(typeof responce !== 'string') {
            this.fields = responce
          }
        }
      );
  }

  showField(fieldName: string): void {
    this.field = fieldName;
    this.details = true;
  }

}

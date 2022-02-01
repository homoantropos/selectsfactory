import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../shared/services/filterRequetsServise";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})
export class FilterFieldsDashboardComponent implements OnInit {

  // @ts-ignore
  @Input() field: string;
  fields: Array<FilterFieldModel> = [];
  details = false;

  constructor(
    private frs: FilterRequestService,
    private changeDetect: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.frs.getFilterFields()
      .subscribe(
        response => {
          if (typeof response !== 'string') {
            this.fields = response
          }
        }
      );
  }

  showField(fieldName: string): void {
    this.details = !this.details;
    this.field = fieldName;
    this.changeDetect.detectChanges();
    this.details = true;
  }

}

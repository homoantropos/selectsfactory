import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestService} from "../../shared/services/filterRequetsServise";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})

export class FilterFieldsDashboardComponent implements OnInit {

  fields: Array<FilterFieldModel> = [];
  emptyDBMessage = '';
  // @ts-ignore
  @Input() field: string;
  showEditor = false;

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
          } else {
            this.emptyDBMessage = response;
          }
        }
      );
  }

  editField(fieldName: string): void {
    this.showEditor = !this.showEditor;
    this.field = fieldName;
    this.changeDetect.detectChanges();
    this.showEditor = true;
  }

}

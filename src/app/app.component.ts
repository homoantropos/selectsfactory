import {Component, OnInit} from '@angular/core';
import {AdminMiddleware} from "./shared/services/admin-middleware";
import {FilterRequestService} from "./shared/services/filterRequetsServise";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'selectsfactory';
  constructor(
    private admin: AdminMiddleware,
    private dbService: FilterRequestService
  ) {
  }

  ngOnInit() {
    this.dbService.getFilterFields().pipe(
      switchMap(
        response => {
          if (typeof response !== 'string') {
            this.admin.setFields(response)
          } else {
            this.admin.emptyDbMessage = response;
          }
          return this.dbService.getFieldsName()
        }
      ),
      switchMap(
        fieldsName => {
          this.admin.setFieldNames(fieldsName);
          return this.dbService.getRequest();
        }
      )
    )
      .subscribe(
        filterRequestInitValue => {
          if(typeof filterRequestInitValue !== 'string') {
            this.admin.setFilterRequestInitValue(filterRequestInitValue);
          }
        }
      );
  }
}

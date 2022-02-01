import {Injectable} from "@angular/core";
import {MockDataBase} from "../../data/mockDb/mockDataBase";
import {Observable, of} from "rxjs";
import {FilterRequestInitValue} from "../config/types";
import {FilterFieldModel} from "../../data/mockDb/models";

@Injectable({
  providedIn: 'root'
})

export class FilterRequestService {

  constructor(
    private db: MockDataBase
  ) { }

  createField(filterField: FilterFieldModel): Observable<FilterRequestInitValue> {
    return of(this.db.addFilterField(filterField))
  }

  getRequest(values?: Array<string>): Observable<FilterRequestInitValue> {
    return of(
      this.db.getFilterRequestInitValue(values)
    )
  }

  getFilterFieldByKey(key: string): Observable<FilterFieldModel | string> {
    return of(this.db.getFilterFieldByKey(key));
  }

  getFilterFields(): Observable<Array<FilterFieldModel> | string> {
    return of(
      this.db.db
    )
  }

}

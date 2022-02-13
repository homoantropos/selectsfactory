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

  createField(filterField: FilterFieldModel): Observable<Array<FilterFieldModel>> {
    return of(this.db.addOrUpdateFilterField(filterField))
  }

  getRequest(values?: Array<string>): Observable<FilterRequestInitValue> {
    return of(this.db.getFilterRequestInitValue(values))
  }

  getFullRequest(): Observable<FilterRequestInitValue> {
    return of(this.db.getFullFilterRequestInitValue())
  }


  getFilterFieldByKey(key: string): Observable<FilterFieldModel | string> {
    return of(this.db.getFilterFieldByKey(key));
  }

  getFilterFields(): Observable<Array<FilterFieldModel>> {
    return of(this.db.db);
  }

  getFieldsName(): Observable<Array<string>> {
    return of(this.db.getFieldsName());
  }

  removeField(fieldName: string): Observable<Array<FilterFieldModel>> {
    return of(this.db.removeField(fieldName))
  }

}

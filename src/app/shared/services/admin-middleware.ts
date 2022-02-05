import {Injectable} from "@angular/core";
import {FilterFieldModel} from "../../data/mockDb/models";
import {FilterRequestInitValue} from "../config/types";

@Injectable({
  providedIn: 'root'
})

export class AdminMiddleware {

  private _fields: Array<FilterFieldModel> = [];
  private _filterRequestInitValue: FilterRequestInitValue = {};

  showEditor = false;

  get fields() {
    return this._fields;
  }

  setFields(fields: Array<FilterFieldModel>): void {
    this._fields = fields;
  }

  get filterRequestInitValue(): FilterRequestInitValue {
    return this._filterRequestInitValue
  }

  setFilterRequestInitValue(filterRequestInitValue: FilterRequestInitValue) {
    this._filterRequestInitValue = filterRequestInitValue;
  }
}

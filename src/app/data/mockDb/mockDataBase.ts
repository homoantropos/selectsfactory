import {Injectable} from "@angular/core";
import {FilterRequestInitValue} from "../../shared/config/types";
import {DbService} from "./db.service";
import {FilterFieldModel} from "./models";

@Injectable({
  providedIn: 'root'
})

export class MockDataBase {

  constructor(
    private dbService: DbService
  ) {
  }

  private _db: Array<FilterFieldModel> = [
    {
      fieldName: 'direction',
      initValue: '',
      valueOptions: [
        {option: 'One', value: 'One'},
        {option: 'Two', value: 'Two'},
        {option: 'Three', value: 'Three'}
      ]
    },
    {
      fieldName: 'participants',
      initValue: '',
      valueOptions: [
        {value: 'schoolchild', option: 'Учні'},
        {value: 'students', option: 'Студенти'},
        {value: '', option: 'Учні і студенти разом'}
      ]
    }
  ]

  set db(value: Array<FilterFieldModel>) {
    this._db = value;
  }

  get db(): Array<FilterFieldModel> {
    return this._db;
  }

  addOrUpdateFilterField(filterField: FilterFieldModel): FilterRequestInitValue {
    const i = this._db.findIndex(ff => ff.fieldName === filterField.fieldName);
    if (i !== -1) {
      delete this._db[i];
    }
    this._db.push(filterField);

    let response: FilterRequestInitValue = {};
    response[filterField.fieldName] = {
      initValue: filterField.initValue,
      valueOptions: filterField.valueOptions
    }
    return response
  }

  getFilterRequestInitValue(values ?: Array<string>): FilterRequestInitValue {
    let response: FilterRequestInitValue = {};
    this._db.map(
      filterField => {
        if (
          !values?.includes(filterField.fieldName.toLowerCase())
        ) {
          response[filterField.fieldName] = {
            initValue: filterField.initValue,
            valueOptions: filterField.valueOptions
          }
        }
      });
    if (values?.includes('years')) {
      response = this.dbService.addYear(response);
    }
    return response;
  }

  getFilterFieldByKey(fieldName: string): FilterFieldModel | string {
    const filterField = this.db.filter(filterField => filterField.fieldName === fieldName)[0];
    let response;
    if (filterField) {
      response = filterField
    } else {
      response = 'Такого поля не існує'
      console.log(response)
    }
    return response
  }

}



import {FilterRequestInitValue} from "../../shared/config/types";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class DbService {
  addYear(base: FilterRequestInitValue): FilterRequestInitValue {
    let startYear = 2019;
    const actualYear = new Date().getFullYear();
    const years = {
      years: {
        initValue: `${actualYear}`,
        valueOptions: [
          {value: '', option: 'За весь час'}
        ]
      }
    };
    for (startYear; startYear <= actualYear; startYear++) {
      years.years.valueOptions.push({value: `${startYear}`, option: `${startYear}`});
    }
    return this.setInitValue(base, years);
  }

  setInitValue(base: FilterRequestInitValue, addedValue: FilterRequestInitValue): FilterRequestInitValue {
    Object.keys(addedValue)
      .map(
        key => {
          base[key] = addedValue[key];
        }
      );
    return base;
  }
}

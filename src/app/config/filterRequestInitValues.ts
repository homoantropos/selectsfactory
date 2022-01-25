import {FilterRequestInitValue} from '../components/filter-request-spring/filter-request-spring.component';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FilterRequestInitValues {

  filterRequest: FilterRequestInitValue = { };

  setInitValue(addedValue: FilterRequestInitValue): FilterRequestInitValue {
    const ini = this.getIni();
    Object.keys(addedValue)
      .map(
        key => {
          ini[key] = addedValue[key];
        }
      );
    return ini;
  }

  getInitValue(values?: Array<string>): FilterRequestInitValue {
    const ini = this.addYear();
    if (values && values.length > 0) {
      Object.keys(ini)
        .map(
          key => {
            if (!values.includes(key)) {
              delete ini[key];
            }
          }
        );
    }
    return ini;
  }

  addYear(): FilterRequestInitValue {
    let startYear = 2021;
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
    return this.setInitValue(years);
  }

  getIni(): FilterRequestInitValue {
    return {
      direction: {
        initValue: '',
        valueOptions: [
          {value: 'physical culture', option: 'Фізична культура'},
          {value: 'sport', option: 'Спорт'},
          {value: '', option: 'ФК і спорт разом'}
        ]
      },
      participants: {
        initValue: '',
        valueOptions: [
          {value: 'schoolchild', option: 'Учні'},
          {value: 'students', option: 'Студенти'},
          {value: '', option: 'Учні і студенти разом'}
        ]
      },
      gender: {
        initValue: '',
        valueOptions: [
          {value: 'female', option: 'Дівчата'},
          {value: 'male', option: 'Хлопці'},
          {value: '', option: 'Дівчата і хлопці разом'}
        ]
      },
      regionGroup: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'Без урахування груп'},
          {value: '1', option: 'Перша група регіонів'},
          {value: '2', option: 'Друга група регіонів'},
          {value: '3', option: 'Третя група регіонів'}
        ]
      },
      eduEntityType: {
        initValue: '',
        valueOptions: [
          {value: 'ЗЗСО', option: 'ЗЗСО'},
          {value: 'ЗП(ПТ)О', option: 'ЗП(ПТ)О'}
        ]
      },
      category: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'Без розподілу на категорії'},
          {value: '1', option: 'ЗВО першої категорії'},
          {value: '2', option: 'ЗВО другої категорії'},
          {value: '3', option: 'ЗВО третьої категорії'},
          {value: '4', option: 'ЗВО четвертої категорії'},
          {value: '5', option: 'ЗВО п\'ятої категорії'},
          {value: '6', option: 'ЗВО щостої категорії'}
        ]
      },
      organiser: {
        initValue: '',
        valueOptions: [
          {value: '', option: 'В цілому'},
          {value: 'КФВС МОН', option: 'КФВС МОН'},
          {value: 'СССУ', option: 'СССУ'},
          {value: 'УФУС', option: 'УФУС'}
        ]
      }
    };
  }
}

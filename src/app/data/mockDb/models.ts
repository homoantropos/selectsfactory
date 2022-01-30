export interface FilterFieldModel {
  fieldName: string;
  initValue: string;
  valueOptions: Array<{
    value: string, option: string
  }>
}

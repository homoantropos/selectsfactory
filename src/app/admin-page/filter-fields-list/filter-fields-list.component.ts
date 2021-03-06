import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FilterFieldModel} from "../../data/mockDb/models";

@Component({
  selector: 'app-filter-fields-list',
  templateUrl: './filter-fields-list.component.html',
  styleUrls: ['./filter-fields-list.component.css']
})

export class FilterFieldsListComponent implements OnInit, OnDestroy {

  @Input() fields: Array<FilterFieldModel> = [];
  @Output() fieldName: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitFieldForEditor(fieldName: string): void {
    this.fieldName.emit(fieldName)
  }

  ngOnDestroy(): void {
   return this.emitFieldForEditor('close editor');
  }

}

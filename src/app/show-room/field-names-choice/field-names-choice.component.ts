import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-field-names-choice',
  templateUrl: './field-names-choice.component.html',
  styleUrls: ['./field-names-choice.component.css']
})

export class FieldNamesChoiceComponent implements OnInit {

  @Input() fieldNames: Array<string> = [];
  @Output() requestFields: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  request: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  produceRequest(fieldName: string): void {
    if(this.request.includes(fieldName.toLowerCase())) {
     this.request = this.request.filter( fN => fN !== fieldName);
    } else {
      this.request.push(fieldName);
    }
    this.requestFields.emit(this.request);
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminMiddleware} from "../../shared/services/admin-middleware";

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
    let req = [];
    if(this.request.includes(fieldName.toLowerCase())) {
      console.log(this.request);
     req = this.request.filter( fN => fN === fieldName);
      console.log(this.request);
    } else {
      this.request.push(fieldName);
      req = this.request;
    }
    this.requestFields.emit(req);
  }

}

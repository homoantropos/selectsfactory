import { Component, OnInit } from '@angular/core';
import {FilterRequestInitValue} from "../../config/types";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  filterRequestInitValue: FilterRequestInitValue =
    {
      direction: {
        initValue: '',
        valueOptions: [
          {option: 'One', value: 'One'},
          {option: 'Two', value: 'Two'},
          {option: 'Three', value: 'Three'}
        ]
      }
    };

  constructor() { }

  ngOnInit(): void {
  }

}

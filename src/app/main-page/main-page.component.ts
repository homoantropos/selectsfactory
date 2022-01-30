import {Component, OnInit} from '@angular/core';
import {FilterRequestInitValue} from "../config/types";
import {FilterRequestService} from "../services/filterRequetsServise";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  filterRequestInitValue: FilterRequestInitValue = {};

  constructor(
    private frService: FilterRequestService
  ) { }

  ngOnInit(): void {
    this.frService.getRequest(['years']).subscribe(
      filterRequestInitValue => {
        this.filterRequestInitValue = filterRequestInitValue;
      }
    );
  }

}

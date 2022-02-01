import {Component, OnInit} from '@angular/core';
import {FilterRequestInitValue} from "../shared/config/types";
import {FilterRequestService} from "../shared/services/filterRequetsServise";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  filterRequestInitValue: FilterRequestInitValue = {};
  showMainPage = true;

  constructor(
    private frService: FilterRequestService
  ) {
  }

  ngOnInit(): void {
    this.frService.getRequest(['years']).subscribe(
      filterRequestInitValue => {
        this.filterRequestInitValue = filterRequestInitValue;
      }
    );
  }

  showAdmin(): void {
    this.showMainPage = !this.showMainPage;
  }
}

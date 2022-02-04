import {Component, OnInit} from '@angular/core';
import {FilterRequestInitValue} from "../shared/config/types";
import {FilterRequestService} from "../shared/services/filterRequetsServise";

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})

export class ShowRoomComponent implements OnInit {

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
}

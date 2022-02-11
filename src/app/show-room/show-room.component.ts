import {Component, Input, OnInit} from '@angular/core';
import {FilterRequestService} from "../shared/services/filterRequetsServise";
import {AdminMiddleware} from "../shared/services/admin-middleware";
import {FilterRequestInitValue} from "../shared/config/types";

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})

export class ShowRoomComponent implements OnInit {

  @Input() shownSelectsNames: Array<string> = [];
  filterRequestInitValue: FilterRequestInitValue = {};

  showMainPage = true;

  constructor(
    private frService: FilterRequestService,
    public adminMiddleware: AdminMiddleware
  ) {
  }

  ngOnInit(): void {

  }

  createSelect(shownSelectsNames: Array<string>) {
    console.log(shownSelectsNames);
    this.shownSelectsNames = shownSelectsNames.slice();
    this.frService.getRequest(this.shownSelectsNames).subscribe(
      filterRequestInitValue => {
        this.filterRequestInitValue = filterRequestInitValue;
      }
    );
  }
}

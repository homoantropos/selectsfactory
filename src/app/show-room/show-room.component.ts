import {Component, Input, OnInit} from '@angular/core';
import {FilterRequestService} from "../shared/services/filterRequetsServise";
import {AdminMiddleware} from "../shared/services/admin-middleware";
import {FilterRequest, FilterRequestInitValue} from "../shared/config/types";

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})

export class ShowRoomComponent implements OnInit {

  @Input() shownSelectsNames: Array<string> = [];
  @Input() queryValues: FilterRequest = {};
  filterRequestInitValue: FilterRequestInitValue = {};

  showMainPage = true;
  showSelects = false;

  constructor(
    private frService: FilterRequestService,
    public adminMiddleware: AdminMiddleware
  ) {
  }

  ngOnInit(): void {

  }

  createSelect(shownSelectsNames: Array<string>) {
    this.shownSelectsNames = shownSelectsNames.slice();
    this.frService.getRequest(this.shownSelectsNames).subscribe(
      filterRequestInitValue =>
        this.filterRequestInitValue = filterRequestInitValue
    );
  }

  getQueryValues(filterRequest: FilterRequest): void {
    this.queryValues = filterRequest;
  }

  emptyQuery(): boolean {
    return this.shownSelectsNames.length > 0;
  }

  closeSelects(): void {
    this.showSelects = !this.showSelects;
    this.queryValues = {};
  }

}

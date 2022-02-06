import {
  Component,
  OnInit
} from '@angular/core';
import {FilterRequestService} from "../shared/services/filterRequetsServise";
import {AdminMiddleware} from "../shared/services/admin-middleware";

@Component({
  selector: 'app-show-room',
  templateUrl: './show-room.component.html',
  styleUrls: ['./show-room.component.css']
})

export class ShowRoomComponent implements OnInit {

  showMainPage = true;

  constructor(
    private frService: FilterRequestService,
    public adminMiddleware: AdminMiddleware
  ) {
  }

  ngOnInit(): void {
    // this.frService.getRequest(['years']).subscribe(
    //   filterRequestInitValue => {
    //     this.adminMiddleware.setFilterRequestInitValue(filterRequestInitValue);
    //   }
    // );
  }
}

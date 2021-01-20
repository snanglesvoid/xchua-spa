import {Component, OnInit, Input} from '@angular/core';
import {ViewingRoomModel} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-viewing-room-list',
  templateUrl: './viewing-room-list.component.html',
  styleUrls: ['./viewing-room-list.component.less']
})
export class ViewingRoomListComponent implements OnInit {

  @Input() rooms: ViewingRoomModel[];


  constructor() {}

  ngOnInit() {
  }

}

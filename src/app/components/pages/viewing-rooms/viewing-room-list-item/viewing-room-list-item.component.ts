import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {ViewingRoomModel} from 'src/app/models/ViewingRoom';
import {
  trigger,
  animate,
  style,
  transition
} from '@angular/animations';
import {ViewportPosition} from 'src/app/directives/scroll-to.directive';

@Component({
  selector: 'app-viewing-room-list-item',
  templateUrl: './viewing-room-list-item.component.html',
  styleUrls: ['./viewing-room-list-item.component.less'],
  animations: [
    trigger('inOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('600ms ease-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('600ms ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ViewingRoomListItemComponent implements OnInit {


  constructor() {}

  @Input() room: ViewingRoomModel;
  @HostBinding('@inOut') inOut = true;

  viewportPosition: ViewportPosition = 0;


  ngOnInit() {
  }

  inViewportChange(event: any) {
    this.viewportPosition = event;
  }
}

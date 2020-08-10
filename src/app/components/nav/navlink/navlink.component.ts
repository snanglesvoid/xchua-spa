import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.less']
})
export class NavlinkComponent implements OnInit {
  @Input() href: string;
  @Input() section: string;
  @Input() snippet: string;

  @Output() clicked = new EventEmitter<any>();

  @Input() active = false;

  constructor() {}

  ngOnInit() {}

  linkClicked($event: any) {
    this.clicked.emit($event);
  }
}

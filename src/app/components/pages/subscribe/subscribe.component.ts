import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.less']
})
export class SubscribeComponent implements OnInit, OnDestroy {
  submitted = false;

  constructor() {}

  ngOnInit() {
  }
  ngOnDestroy(): void {
  }

  subscribe() {}
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor() {}

  inViewport = false;

  ngOnInit() {
  }

  viewportChange($event: any) {
    this.inViewport = $event === 0;
  }
}

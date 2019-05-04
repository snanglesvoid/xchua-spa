import { Component, OnInit } from '@angular/core';
import {
  trigger, style, animate, keyframes
} from '@angular/animations'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less'],
  animations: [
    trigger('open-close', [

    ]) 
  ]
})
export class NavComponent implements OnInit {

  private isOpen: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  navToggled(event) {
    console.log('nav toggled', event)
    this.isOpen = event
  }

}

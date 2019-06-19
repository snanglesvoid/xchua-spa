import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, state, query, transition } from '@angular/animations';

@Component({
  selector: 'app-ripple-button',
  templateUrl: './ripple-button.component.html',
  styleUrls: ['./ripple-button.component.less'],
  animations: [
    trigger('rippleList', [
      query(':enter', [
        transition('* <=> *', [
          style({
            transform: 'scale(0) translate(-50%, -50%)',
            opacity: 1
          }),
          animate('1000ms', style({
            transform: 'scale(1) translate(-50%, -50%)',
            opacity: 0,
          }))
        ])
      ], { optional: true }),
      query(':leave', [
        transition('* <=> *', [
         
        ])
      ])
    ])
  ]
})
export class RippleButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    ;(window as any).btn = this
  }

  @Output()
  click = new EventEmitter<any>()

  onclick($event) {
    this.click.emit($event)
  }

  ripples = []

  ripple(x, y) {
    let r = {x: x, y: y}
    this.ripples.push(r)
    setTimeout(() => {
      this.ripples.splice(this.ripples.indexOf(r), 1)
    }, 1500)
  }

}

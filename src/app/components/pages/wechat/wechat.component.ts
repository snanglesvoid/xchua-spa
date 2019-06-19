import { Component, OnInit } from '@angular/core';
import { trigger, animate, transition, style, state } from '@angular/animations'

@Component({
  selector: 'app-wechat',
  templateUrl: './wechat.component.html',
  styleUrls: ['./wechat.component.less'],
  animations: [
    trigger('fadeIn', [
      state('out', style({ opacity: 0 })),
      state('in', style({ opacity: 1 })),
      transition('out => in', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class WechatComponent implements OnInit {

  loading = true

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.loading = false, 1000)
  }

  fadeState() {
    return this.loading ? 'out' : 'in'
  }
}
 
import { Component, OnInit, Input } from '@angular/core'
import { trigger, state, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  animations: [
    trigger('position', [
      state('normal', style({})),
      state('big', style({})),
      transition('small <=> big', animate('600ms ease')),
    ]),
  ],
})
export class PageHeaderComponent implements OnInit {
  @Input() big = false

  constructor() {}

  ngOnInit() {
    // console.log('page header init')
    window.scroll(0, 0)
  }
}

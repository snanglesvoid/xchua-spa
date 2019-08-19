import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { interval } from 'rxjs'

@Component({
  selector: 'app-nav-toggle',
  templateUrl: './nav-toggle.component.html',
  styleUrls: ['./nav-toggle.component.less'],
})
export class NavToggleComponent implements OnInit {
  @Output() toggled = new EventEmitter<Boolean>()

  private _open: boolean = false
  @Input()
  get open() {
    return this._open
  }
  set open(value) {
    this._open = value
  }

  constructor() {}
  // idx = 0
  ngOnInit() {
    // interval(1000).subscribe(_ => {
    //   this.idx--
    //   this.idx += 3
    //   this.idx %= 3
    // })
  }

  toggleNav() {
    this._open = !this._open
    this.toggled.emit(this._open)
  }
}

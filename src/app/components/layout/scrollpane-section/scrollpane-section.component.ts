import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrollpane-section',
  templateUrl: './scrollpane-section.component.html',
  styleUrls: ['./scrollpane-section.component.less']
})
export class ScrollpaneSectionComponent implements OnInit {

  @Input() snippet: string

  @Output() requestScroll = new EventEmitter<boolean>()
  @Output() activeChange = new EventEmitter<boolean>()

  private _active: boolean = false
  @Input()
  get active() {
    return this._active
  }
  set active(value) {
    this._active = value
    if (this._active) {
      this.requestScroll.emit(true)
    }
    this.activeChange.emit(this._active)
  }

  @ViewChild('hr') hr: ElementRef

  public get offsetTop() {
    return this.el.nativeElement.offsetTop
  }
  public get height() {
    return this.el.nativeElement.getBoundingClientRect().height
  }
  public get lineConnectionPoint() {
    let r = (this.hr.nativeElement as HTMLHRElement).getBoundingClientRect()
    return {
      x : r.left,
      y : r.top + r.height / 2.0
    }
  }
  public get hrRect() {
    return (this.hr.nativeElement as HTMLHRElement).getBoundingClientRect()
  }

  setActiveNoScroll(value: boolean) {
    this._active = value
    this.activeChange.emit(value)
  }

  constructor(
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.el.nativeElement.id = this.snippet
  }

}

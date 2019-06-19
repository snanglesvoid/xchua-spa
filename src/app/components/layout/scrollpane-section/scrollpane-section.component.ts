import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-scrollpane-section',
  templateUrl: './scrollpane-section.component.html',
  styleUrls: ['./scrollpane-section.component.less']
})
export class ScrollpaneSectionComponent implements OnInit, AfterContentInit, AfterContentChecked {

  @Input() snippet: string
  @Input() subsection: boolean = false
  @Input() scrollToOffset: number = 0

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

  public get offsetTop(): number {
    return this.el.nativeElement.offsetTop
    // return this.el.nativeElement.getBoundingClientRect().top
  }
  public get height(): number {
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

  @ViewChild('projected') projected: ElementRef
  ngAfterContentInit() {
    this.isEmpty = this.projected.nativeElement.getBoundingClientRect().height < 3
  }
  ngAfterContentChecked() {
    this.isEmpty = this.projected.nativeElement.getBoundingClientRect().height < 3
  }

  isEmpty: boolean = true

}

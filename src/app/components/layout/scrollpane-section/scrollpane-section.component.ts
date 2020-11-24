import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterContentInit,
  AfterContentChecked,
} from '@angular/core';

@Component({
  selector: 'app-scrollpane-section',
  templateUrl: './scrollpane-section.component.html',
  styleUrls: ['./scrollpane-section.component.less'],
})
export class ScrollpaneSectionComponent
  implements OnInit, AfterContentInit, AfterContentChecked {
  @Input()
  get active() {
    return this.mActive;
  }
  set active(value) {
    this.mActive = value;
    if (this.mActive) {
      this.requestScroll.emit(true);
    }
    this.activeChange.emit(this.mActive);
  }

  public get offsetTop(): number {
    return this.el.nativeElement.offsetTop;
    // return this.el.nativeElement.getBoundingClientRect().top
  }
  public get height(): number {
    return this.el.nativeElement.getBoundingClientRect().height;
  }
  public get lineConnectionPoint() {
    const r = (this.hr.nativeElement as HTMLHRElement).getBoundingClientRect();
    return {
      x: r.left,
      y: r.top + r.height / 2.0,
    };
  }
  public get hrRect() {
    return (this.hr.nativeElement as HTMLHRElement).getBoundingClientRect();
  }

  constructor(public el: ElementRef) {}
  @Input() snippet: string;
  @Input() subsection = false;
  @Input() navlink = true;
  @Input() scrollToOffset = 0;

  @Output() requestScroll = new EventEmitter<boolean>();
  @Output() activeChange = new EventEmitter<boolean>();

  childActive: boolean;
  private mActive = false;

  @ViewChild('hr') hr: ElementRef;

  @ViewChild('projected') projected: ElementRef;

  isEmpty = true;

  setActiveNoScroll(value: boolean) {
    this.mActive = value;
    this.activeChange.emit(value);
  }

  ngOnInit() {
    this.el.nativeElement.id = this.snippet;
  }
  ngAfterContentInit() {
    this.isEmpty =
      this.projected.nativeElement.getBoundingClientRect().height < 3;
  }
  ngAfterContentChecked() {
    this.isEmpty =
      this.projected.nativeElement.getBoundingClientRect().height < 3;
  }
}

import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ViewChildren,
  ContentChildren,
  QueryList,
  HostListener
} from "@angular/core";
import { ScrollpaneSectionComponent } from "../scrollpane-section/scrollpane-section.component";
import { EasingFunctionsService } from "src/app/services/easing-functions.service";
import {
  SvgCanvasService,
  CanvasPolyline
} from "src/app/services/svg-canvas.service";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-scrollpane",
  templateUrl: "./scrollpane.component.html",
  styleUrls: ["./scrollpane.component.less"]
})
export class ScrollpaneComponent
  implements OnInit, OnDestroy, AfterContentInit {
  showBoxShadowTop: boolean = false;
  showBoxShadowBottom: boolean = true;

  private _last: number = 0;
  private _top: number = 0;

  @HostListener("window:scroll", [])
  onWindowScrolled() {
    // console.log('scroll, pageYOffset', window.pageYOffset)
    this._last = this._top;
    this._top = window.pageYOffset;
    if (this._last == this._top) return;
    if (this._top > this._last) {
      this.scrolledDown();
    } else {
      this.scrolledUp();
    }
    if (this._top == 0) {
      this.reachedStart();
    }
    this.updateActiveSections();
    this.updateLines();
    this.scrolled.emit(this.offsetTop);
  }

  private scrolledDown() {
    // console.log('down')
    this.scrollDown.emit(this.offsetTop);
    this.top = false;
  }
  private scrolledUp() {
    // console.log('up')
    this.scrollUp.emit(this.offsetTop);
    this.bottom = false;
  }
  private reachedStart() {
    // console.log('start')
    this.top = true;
    this.reachStart.emit(this.offsetTop);
  }
  private reachedEnd() {
    // console.log('end')
    this.bottom = true;
    this.reachEnd.emit(this.offsetTop);
  }

  private resizeListener = () => {
    this.updateLines();
  };

  public get offsetTop(): number {
    return this._top;
  }
  public set offsetTop(value: number) {
    this._top = value;
    window.scroll(0, this._top);
  }
  private bottom: boolean = false;
  private top: boolean = true;

  private updateActiveSections = () => {};

  private lines: CanvasPolyline[] = [];

  @Input() boxShadows: boolean = true;
  private _showLines: boolean = false;
  @Input()
  get showLines() {
    return this._showLines;
  }
  set showLines(value) {
    this._showLines = value;
    if (this.sections) {
      this.createLines();
      this.updateLines();
    }
  }

  @Input() noPadding: boolean = false;
  @Input() scrollOffset: number = 158;

  @Output() reachStart = new EventEmitter<any>();
  @Output() reachEnd = new EventEmitter<any>();
  @Output() scrollUp = new EventEmitter<any>();
  @Output() scrollDown = new EventEmitter<any>();
  @Output() scrolled = new EventEmitter<any>();

  @ViewChild("scrollpane") scrollpane: ElementRef;
  @ViewChildren("hr") hrs: QueryList<ElementRef>;
  @ContentChildren(ScrollpaneSectionComponent) sections: QueryList<
    ScrollpaneSectionComponent
  >;

  constructor(
    private svgCanvas: SvgCanvasService,
    private easingFunctions: EasingFunctionsService,
    private client: ClientService
  ) {
    // ;(window as any).sp = this
  }

  clientSizeChangeSubscription;
  ngOnInit() {
    const onMSChange = evt => {
      this.scrollOffset =
        this.client.isMediaSm() || this.client.isMediaMd()
          ? this.client.tabbarOffsetYSm
          : this.client.tabbarOffsetY;
    };
    this.clientSizeChangeSubscription = this.client.mediaSizeChanged.subscribe(
      onMSChange
    );
    onMSChange(this.client.mediaSize);
  }
  ngAfterContentInit() {
    if (this.sections && this.sections.length > 0) {
      this.initSections();
      this.sections.changes.subscribe(_ => {
        this.sections.forEach(s => {
          s.activeChange.subscribe(_ => {
            if (!s.active) return;
            if (!s.subsection) {
              this.sections.first.childActive = false;
            } else if (s.active) {
              this.sections.first.childActive = true;
            }
          });
        });
      });
    }
    window.addEventListener("resize", this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.resizeListener);
    this.lines.forEach(l => this.svgCanvas.deleteElement(l));
    this.clientSizeChangeSubscription.unsubscribe();
  }

  initSections() {
    // console.log('initsections')
    this.sections.forEach(s => {
      s.requestScroll.subscribe(event => {
        this.scrollToSection(s);
      });
    });
    this.updateActiveSections = () => {
      let top = this.offsetTop;
      if (this.top) {
        let section = this.sections.toArray().find(x => !x.isEmpty);
        this.sections.forEach(s => s.setActiveNoScroll(s == section));
        return;
      }
      if (this.bottom) {
        let section = this.sections.last;
        this.sections.forEach(s => s.setActiveNoScroll(s == section));
        return;
      }
      for (let section of this.sections.toArray().reverse()) {
        if (top + 50 >= section.offsetTop - this.scrollOffset) {
          this.sections.forEach(s => s.setActiveNoScroll(s == section));
          break;
        }
      }
    };
    this.sections.forEach(s => s.setActiveNoScroll(s == this.sections.first));
    this.createLines();
    this.sections.changes.subscribe(c => {
      this.createLines();
    });
    setTimeout(() => this.updateLines(), 50);
  }

  scrollTo(y: number, callback = null, duration = 250) {
    const diff = y - this.offsetTop;
    if (diff == 0) return;
    // const duration = Math.abs(diff * 2.5)
    duration += Math.abs(0.5 * diff);
    const startingY = this.offsetTop;
    let start;

    let step = timestamp => {
      start = !start ? timestamp : start;
      const time = timestamp - start;
      let ratio = this.easingFunctions.easeOutQuad(
        Math.min(time / duration, 1)
      );
      this.offsetTop = startingY + diff * ratio;
      if (time < duration) {
        window.requestAnimationFrame(step);
      } else {
        if (callback) callback();
      }
    };
    window.requestAnimationFrame(step);
  }

  scrollToSection(section: ScrollpaneSectionComponent, duration = 250) {
    // console.log('section: (top, height)', section.offsetTop, section.height)
    let y =
      this.sections.first === section
        ? 0
        : section.offsetTop - this.scrollOffset;
    y += section.scrollToOffset;
    this.scrollTo(y, () => {
      this.sections.forEach(s => s.setActiveNoScroll(s == section));
    });
  }

  createLines() {
    if (this.showLines) {
      console.log("create lines");
      if (this.lines) {
        this.lines.forEach(l => this.svgCanvas.deleteElement(l));
      }
      this.lines = this.sections
        .filter(s => s !== this.sections.last)
        .map(s => {
          let line = this.svgCanvas.polyline(true);
          line.strokeWidth = "1px";
          line.stroke = "#CCC";
          return line;
        });
    } else {
      this.lines.forEach(line => {
        this.svgCanvas.deleteElement(line);
      });
      this.lines = [];
    }
  }
  updateLines() {
    if (!this.hrs || !this.showLines) return;
    let hrs = this.hrs.toArray();
    this.sections
      .filter(s => s !== this.sections.last)
      .forEach((s, i) => {
        let line = this.lines[i];
        if (!line) return;
        let hr: HTMLHRElement = hrs[i].nativeElement;
        let r = hr.getBoundingClientRect();
        let r1 = s.hrRect;
        let p0 = { x: r.left, y: r.top + r.height * 0.5 };
        let p3 = { x: r1.left + r1.width, y: r1.top + r1.height * 0.5 };
        let p1 = {
          x: r.left + r.width + 0.5 * (r1.left - r.left - r.width),
          y: p0.y
        };
        let p2 = { x: p1.x, y: p3.y };
        let pts = [p0, p1, p2, p3];
        line.points = pts;
      });
  }
}

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
} from '@angular/core';

import {ScrollpaneSectionComponent} from '../scrollpane-section/scrollpane-section.component';

import {
  SvgCanvasService,
  CanvasPolyline
} from 'src/app/services/svg-canvas.service';

import {ClientService} from 'src/app/services/client.service';

@Component({
  selector: 'app-scrollpane',
  templateUrl: './scrollpane.component.html',
  styleUrls: ['./scrollpane.component.less']
})
export class ScrollpaneComponent
  implements OnInit, OnDestroy, AfterContentInit {

  public get offsetTop(): number {
    return this.mTop;
  }
  public set offsetTop(value: number) {
    this.mTop = value;
    window.scroll(0, this.mTop);
  }
  @Input()
  get showLines() {
    return this.mShowLines;
  }
  set showLines(value) {
    this.mShowLines = value;
    if (this.sections) {
      this.createLines();
      this.updateLines();
    }
  }
  @Input()
  showTabbar = false;

  constructor(
    private svgCanvas: SvgCanvasService,
    private client: ClientService
  ) {
    (window as any).sp = this;
  }
  showBoxShadowTop = false;
  showBoxShadowBottom = true;

  private mLast = 0;
  private mTop = 0;
  private bottom = false;
  private top = true;

  private lines: CanvasPolyline[] = [];

  @Input() boxShadows = true;
  private mShowLines = false;

  @Input() noPadding = false;
  @Input() scrollOffset = 80; // 158;

  @Output() reachStart = new EventEmitter<any>();
  @Output() reachEnd = new EventEmitter<any>();
  @Output() scrollUp = new EventEmitter<any>();
  @Output() scrollDown = new EventEmitter<any>();
  @Output() scrolled = new EventEmitter<any>();

  @ViewChild('scrollpane') scrollpane: ElementRef;
  @ViewChildren('hr') hrs: QueryList<ElementRef>;
  @ContentChildren(ScrollpaneSectionComponent) sections: QueryList<
    ScrollpaneSectionComponent
  >;

  clientSizeChangeSubscription: any;

  @HostListener('window:scroll', [])
  onWindowScrolled() {
    // console.log('scroll, pageYOffset', window.pageYOffset)
    this.mLast = this.mTop;
    this.mTop = window.pageYOffset;
    if (this.mLast === this.mTop) {return;}
    if (this.mTop > this.mLast) {
      this.scrolledDown();
    } else {
      this.scrolledUp();
    }
    if (this.mTop === 0) {
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
  /* private reachedEnd() { */
  /*   // console.log('end') */
  /*   this.bottom = true; */
  /*   this.reachEnd.emit(this.offsetTop); */
  /* } */

  private resizeListener = () => {
    this.updateLines();
  }

  private updateActiveSections = () => {};
  ngOnInit() {
    const onMSChange = (_: any) => {
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
          s.activeChange.subscribe(() => {
            if (!s.active) {
              return;
            }
            if (!s.subsection) {
              this.sections.first.childActive = false;
            } else if (s.active) {
              this.sections.first.childActive = true;
            }
          });
        });
      });
    }
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
    this.lines.forEach(l => this.svgCanvas.deleteElement(l));
    this.clientSizeChangeSubscription.unsubscribe();
  }

  initSections() {
    // console.log('initsections')
    this.sections.forEach(s => {
      s.requestScroll.subscribe(() => {
        this.scrollToSection(s);
      });
    });
    // this.sections.forEach(x => x.setActiveNoScroll(false));
    // this.sections.find(x => !x.isEmpty).setActiveNoScroll(true);
    this.updateActiveSections = () => {
      const top = this.offsetTop;
      if (this.top) {
        // let section = this.sections.first;
        const section = this.sections.find(x => !x.isEmpty);
        this.sections.forEach(s => s.setActiveNoScroll(s === section));
        return;
      }
      if (this.bottom) {
        const section = this.sections.last;
        this.sections.forEach(s => s.setActiveNoScroll(s === section));
        return;
      }
      for (const section of this.sections.toArray().reverse()) {
        if (top + 50 >= section.offsetTop - this.scrollOffset) {
          this.sections.forEach(s => s.setActiveNoScroll(s === section));
          break;
        }
      }
    };
    this.sections.forEach(s => s.setActiveNoScroll(s === this.sections.first));
    this.createLines();
    this.sections.changes.subscribe(c => {
      this.createLines();
    });
    setTimeout(() => this.updateLines(), 50);
  }

  scrollTo(y: number, callback: any = null, duration: number = 500) {
    const diff = y - this.offsetTop;
    if (diff === 0) {return;}
    // const duration = Math.abs(diff * 2.5)
    // duration += Math.abs(0.5 * diff);
    const startingY = this.offsetTop;
    let start;

    this.offsetTop = y;
    // let step = timestamp => {
    //   start = !start ? timestamp : start;
    //   const time = timestamp - start;
    //   let ratio = this.easingFunctions.easeOutQuad(
    //     Math.min(time / duration, 1)
    //   );
    //   this.offsetTop = startingY + diff * ratio;
    //   if (time < duration) {
    //     window.requestAnimationFrame(step);
    //   } else {
    //     if (callback) callback();
    //   }
    // };
    // window.requestAnimationFrame(step);
  }

  scrollToSection(section: ScrollpaneSectionComponent, duration: number = 250) {
    let y =
      this.sections.first === section
        ? 0
        : section.offsetTop - this.scrollOffset;
    y += section.scrollToOffset;
    this.scrollTo(y, () => {
      this.sections.forEach(s => s.setActiveNoScroll(s === section));
    });
  }

  createLines() {
    if (this.showLines) {
      if (this.lines) {
        this.lines.forEach(l => this.svgCanvas.deleteElement(l));
      }
      this.lines = this.sections
        .filter(s => s !== this.sections.last)
        .map(s => {
          const line = this.svgCanvas.polyline(true);
          line.strokeWidth = '1px';
          line.stroke = '#CCC';
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
    if (!this.hrs || !this.showLines) {return;}
    const hrs = this.hrs.toArray();
    this.sections
      .filter(s => s !== this.sections.last)
      .forEach((s, i) => {
        const line = this.lines[i];
        if (!line) {return;}
        const hr: HTMLHRElement = hrs[i].nativeElement;
        const r = hr.getBoundingClientRect();
        const r1 = s.hrRect;
        const p0 = {x: r.left, y: r.top + r.height * 0.5};
        const p3 = {x: r1.left + r1.width, y: r1.top + r1.height * 0.5};
        const p1 = {
          x: r.left + r.width + 0.5 * (r1.left - r.left - r.width),
          y: p0.y
        };
        const p2 = {x: p1.x, y: p3.y};
        const pts = [p0, p1, p2, p3];
        line.points = pts;
      });
  }
}

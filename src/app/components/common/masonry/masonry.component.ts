import {
  Component,
  OnInit,
  Input,
  Output,
  AfterContentInit,
  ElementRef,
  ContentChildren,
  QueryList,
  OnDestroy,
  HostListener,
  ViewChild,
  HostBinding,
  EventEmitter
} from "@angular/core";
import { ClientService } from "src/app/services/client.service";
import { observeProperty } from "src/app/lib/observeProperty";
import { Observable, Subject } from "rxjs";
import { throttleTime, skip } from "rxjs/operators";
import { EasingFunctionsService } from "src/app/services/easing-functions.service";

declare const Packery;

@Component({
  selector: "app-masonry",
  templateUrl: "./masonry.component.html",
  styleUrls: ["./masonry.component.less"]
})
export class MasonryComponent implements OnInit, OnDestroy, AfterContentInit {
  constructor(
    private client: ClientService,
    private el: ElementRef,
    private easingFunctions: EasingFunctionsService
  ) {}

  private packery;

  ngOnInit() {
    this.scrollEventT$ = this.scrollEvent$.pipe(throttleTime(80));
    this.scrollEventT$.subscribe(x => this.onScroll(x));
    this.resizeEventT$ = this.resizeEvent$.pipe(throttleTime(150));
    this.resizeEventT$.subscribe(_ => {
      this.resize();
      setTimeout(() => {
        this.pack();
      }, 100);
    });
  }

  ngOnDestroy() {}

  ngAfterContentInit() {
    this.row$
      .pipe(
        //tap(console.log),
        skip(1)
      )
      .subscribe(_ => setTimeout(_ => this.pack(), 100));
    this.resize();
    setTimeout(_ => this.pack(), 100);
  }

  pack() {
    this.gridItems.forEach(
      x => (x.nativeElement.style.transition = "transform 0")
    );
    if (this.row) {
      return this.packRow();
    }
    let t = new Date();
    let width = this.el.nativeElement.getBoundingClientRect().width;

    console.log("pack, width = ", width, ", size-md = ", this.client.sizeMd);
    let cols =
      width <= this.client.sizeSm
        ? 1
        : width <= 780 // this.client.sizeMd
        ? 2
        : width <= this.client.sizeXl
        ? 3
        : 4;

    let { itemWidth, gutter } =
      cols == 1
        ? { itemWidth: "100%", gutter: 12 }
        : cols == 2
        ? { itemWidth: "calc(50% - 6px)", gutter: 12 }
        : cols == 3
        ? { itemWidth: "calc(33% - 8px)", gutter: 12 }
        : { itemWidth: "calc(25% - 9px)", gutter: 12 };

    this.gridItems.forEach(item => {
      let e: HTMLDivElement = item.nativeElement;
      e.style.width = itemWidth;
      e.style.height = "auto";
    });

    this.gutter = gutter;

    this.grid.nativeElement.style.width = "100%";

    if (!this.packery) {
      this.packery = new Packery(this.grid.nativeElement, {
        gutter: this.gutter,
        transitionDuration: this.transitionDuration,
        stagger: 30
      });
    } else {
      // this.packery.options.originTop = true
      this.packery.layout();
    }
    console.log("pack took ", new Date().getTime() - t.getTime(), "ms");
  }

  packRow() {
    let t = new Date();
    let width =
      this.rowItemWidth * this.gridItems.length +
      this.gutter * (this.gridItems.length + 1) +
      2 * this.placeholderWidth;

    this.grid.nativeElement.style.width = width + "px";
    this.grid.nativeElement.style["min-height"] = 3 * this.rowItemHeight + "px";

    this.gridItems.forEach(x => {
      x.nativeElement.style.width = this.rowItemWidth + "px";
      x.nativeElement.style.height = this.rowItemHeight + "px";
    });

    if (!this.packery) {
      this.packery = new Packery(this.grid.nativeElement, {
        gutter: this.gutter,
        transitionDuration: this.transitionDuration,
        stagger: 30
        // originTop: false,
      });
    } else {
      // this.packery.options.originTop = false
      this.packery.layout();
    }
    setTimeout(_ => {
      this.onScroll(null);
    }, 1000);
    console.log("pack row took ", new Date().getTime() - t.getTime(), "ms");
  }

  imagesLoaded(event) {
    // console.log('masonry images loaded', event)
    setTimeout(() => this.pack(), 20);
  }

  @HostListener("scroll", ["$event"])
  hostScrolled(event) {
    this.scrollEvent$.next(event);
  }
  scrollEvent$: Subject<any> = new Subject<any>();
  scrollEventT$: Observable<any>;
  onScroll(_?: any) {
    // console.log('scrolled')
    // let t = new Date()
    if (!this.row) return;
    let element: HTMLDivElement = this.el.nativeElement;
    let gridItems = this.gridItems.toArray();
    let transformBefore = `translate(-50%, ${this.rowItemWidth}px) scale(1.0)`;
    let transformActive = `translate(0, ${this.rowItemWidth}px) scale(3.0)`;
    let transformAfter = `translate(50%, ${this.rowItemWidth}px) scale(1.0)`;
    let transformPrevious = `translate(-50%, ${this.rowItemWidth}px) scale(1.25)`;
    let transformNext = `translate(50%, ${this.rowItemWidth}px) scale(1.25)`;
    let i;
    for (i = 0; i < gridItems.length; ++i) {
      gridItems[i].nativeElement.style.transition = "transform .4s ease";
      gridItems[i].nativeElement.style.cursor = "auto";
    }
    for (
      i = 0;
      i * (this.rowItemWidth + this.gutter) <
        element.scrollLeft - this.rowItemWidth / 2 && i < gridItems.length - 1;
      i++
    ) {
      gridItems[i].nativeElement.style.transform = transformBefore;
      gridItems[i].nativeElement.style["z-index"] = 0;
    }
    if (i > 0) {
      gridItems[i - 1].nativeElement.style.transform = transformPrevious;
      gridItems[i - 1].nativeElement.style["z-index"] = 1;
    }
    gridItems[i].nativeElement.style.transform = transformActive;
    gridItems[i].nativeElement.style["z-index"] = 2;
    gridItems[i].nativeElement.style.cursor =
      "url(/assets/cursors/zoom-in.svg), auto";
    this.centerItemIndex.emit(i);
    if (i + 1 < gridItems.length) {
      gridItems[i + 1].nativeElement.style.transform = transformNext;
      gridItems[i + 1].nativeElement.style["z-index"] = 1;
    }
    for (i = i + 2; i < gridItems.length; i++) {
      gridItems[i].nativeElement.style.transform = transformAfter;
      gridItems[i].nativeElement.style["z-index"] = 0;
    }
    // console.log('scrolled took',new Date().getTime() - t.getTime(), 'ms')
  }

  @ViewChild("grid") grid: ElementRef;
  @ContentChildren("gridItem") gridItems: QueryList<ElementRef>;

  gutter: number = 12;
  @Input() transitionDuration: string = "0.5s";

  @HostBinding("class.row")
  @Input()
  row: boolean = false;
  private row$ = observeProperty(this, "row");

  resizeEvent$ = new Subject<any>();
  resizeEventT$: Observable<any>;
  @HostListener("window:resize")
  hostResized() {
    this.resizeEvent$.next();
  }
  resize() {
    let w = this.el.nativeElement.getBoundingClientRect().width;
    this.rowItemWidth =
      w <= this.client.sizeSm ? 100 : w <= this.client.sizeMd ? 150 : 200;
    console.log("resize", w, this.rowItemWidth);
  }

  private _rowItemWidth: number = 100;
  // @Input()
  public get rowItemWidth(): number {
    return this._rowItemWidth;
  }
  public set rowItemWidth(value) {
    this._rowItemWidth = value;
  }
  public get rowItemHeight() {
    return this.rowItemWidth;
  }

  get placeholderWidth() {
    if (!this.row) return 0;
    let element: HTMLDivElement = this.el.nativeElement;
    let width = element.getBoundingClientRect().width;
    return width / 2 - this.rowItemHeight / 2;
  }

  scrollBy(dx: number) {
    let duration = 50 + Math.abs(0.5 * dx);
    let el: HTMLDivElement = this.el.nativeElement;
    const startingX = el.scrollLeft;
    let start;
    let step = timestamp => {
      start = !start ? timestamp : start;
      const time = timestamp - start;
      let ratio = this.easingFunctions.easeOutQuad(
        Math.min(time / duration, 1)
      );
      el.scrollLeft = startingX + dx * ratio;
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  nextPicture() {
    this.scrollBy(this.rowItemWidth + this.gutter);
  }
  previousPicture() {
    this.scrollBy(-this.rowItemWidth - this.gutter);
  }

  @HostBinding("class.row_100") get row_100() {
    return this.rowItemWidth == 100;
  }
  @HostBinding("class.row_150") get row_150() {
    return this.rowItemWidth == 150;
  }
  @HostBinding("class.row_200") get row_200() {
    return this.rowItemWidth == 200;
  }
  @Output() centerItemIndex = new EventEmitter<number>();
}

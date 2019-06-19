import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ElementRef,
  ContentChildren,
  QueryList,
  OnDestroy,
  HostListener,
  ViewChild,
  HostBinding,
} from '@angular/core'
import { ClientService } from 'src/app/services/client.service'
import { observeProperty } from 'src/app/lib/observeProperty'
import { Observable, fromEvent, Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

declare const Packery

let count = 0

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.less'],
})
export class MasonryComponent implements OnInit, OnDestroy, AfterContentInit {
  constructor(private client: ClientService, private el: ElementRef) {}

  private packery

  ngOnInit() {
    this.scrollEventT$ = this.scrollEvent$.pipe(throttleTime(80))
    this.scrollEventT$.subscribe(x => this.onScroll(x))
    this.resizeEventT$ = this.resizeEvent$.pipe(throttleTime(150))
    this.resizeEventT$.subscribe(_ => this.resize())
  }

  ngOnDestroy() {}

  ngAfterContentInit() {
    ;(window as any)['masonry' + count++] = this
    this.row$.subscribe(_ => setTimeout(_ => this.pack(), 100))
    if (this.gridItems.length > 0) {
      this.gridItems.first.nativeElement.style.transform =
        'scale(3.0) translate(0, 0)'
      this.gridItems.first.nativeElement.style['z-index'] = 1
    }
    this.resize()
  }

  @HostListener('window:resize')
  pack() {
    console.log('pack')
    if (this.row) {
      return this.packRow()
    }
    let width = this.el.nativeElement.getBoundingClientRect().width
    let cols =
      width <= this.client.sizeSm
        ? 1
        : width <= this.client.sizeMd
        ? 2
        : width <= this.client.sizeXl
        ? 3
        : 4

    let { itemWidth, gutter } =
      cols == 1
        ? { itemWidth: '100%', gutter: 12 }
        : cols == 2
        ? { itemWidth: 'calc(50% - 6px)', gutter: 12 }
        : cols == 3
        ? { itemWidth: 'calc(33% - 8px)', gutter: 12 }
        : { itemWidth: 'calc(25% - 9px)', gutter: 12 }

    this.gridItems.forEach(item => {
      let e: HTMLDivElement = item.nativeElement
      e.style.width = itemWidth
      e.style.height = 'auto'
    })

    this.gutter = gutter

    this.grid.nativeElement.style.width = '100%'

    if (!this.packery) {
      this.packery = new Packery(this.grid.nativeElement, {
        gutter: this.gutter,
        transitionDuration: this.transitionDuration,
        stagger: 30,
      })
    }
    setTimeout(() => {
      this.packery.options.originTop = true
      this.packery.layout()
    }, 100)
  }

  packRow() {
    let width =
      this.rowItemWidth * this.gridItems.length +
      this.gutter * (this.gridItems.length + 1) +
      2 * this.placeholderWidth

    this.grid.nativeElement.style.width = width + 'px'
    this.grid.nativeElement.style['min-height'] = 3 * this.rowItemHeight + 'px'

    // console.log('imgs', this.grid.nativeElement.querySelectorAll('img'))
    // ;(this.grid.nativeElement as HTMLDivElement)
    //   .querySelectorAll('img')
    //   .forEach(x => {
    //     x.style.width = this.rowItemWidth + 'px'
    //     x.style.height = this.rowItemHeight + 'px'
    //   })

    this.gridItems.forEach(x => {
      x.nativeElement.style.width = this.rowItemWidth + 'px'
      x.nativeElement.style.height = this.rowItemHeight + 'px'
    })

    if (!this.packery) {
      this.packery = new Packery(this.grid.nativeElement, {
        gutter: this.gutter,
        transitionDuration: this.transitionDuration,
        stagger: 30,
      })
    }
    setTimeout(() => {
      this.packery.options.originTop = false
      this.packery.layout()
    }, 100)
  }

  imagesLoaded(event) {
    console.log('masonry images loaded', event)
    setTimeout(() => this.pack(), 100)
  }

  @HostListener('scroll', ['$event'])
  hostScrolled(event) {
    this.scrollEvent$.next(event)
  }
  scrollEvent$: Subject<any> = new Subject<any>()
  scrollEventT$: Observable<any>
  onScroll(event?) {
    console.log('scrolled')
    if (!this.row) return
    let element: HTMLDivElement = this.el.nativeElement
    let gridItems = this.gridItems.toArray()
    let i
    for (
      i = 0;
      i * (this.rowItemWidth + this.gutter) <
        element.scrollLeft - this.rowItemWidth && i < gridItems.length - 1;
      i++
    ) {
      gridItems[i].nativeElement.style.transform =
        'scale(1.0) translate(-50%, 0)'
      gridItems[i].nativeElement.style['z-index'] = 0
    }
    gridItems[i].nativeElement.style.transform = 'scale(3.0) translate(0, 0)'
    gridItems[i].nativeElement.style['z-index'] = 1
    for (i = i + 1; i < gridItems.length; i++) {
      gridItems[i].nativeElement.style.transform =
        'scale(1.0) translate(50%, 0)'
      gridItems[i].nativeElement.style['z-index'] = 0
    }
  }

  @ViewChild('grid') grid: ElementRef
  @ContentChildren('gridItem') gridItems: QueryList<ElementRef>

  gutter: number = 12
  @Input() transitionDuration: string = '0.5s'

  @HostBinding('class.row')
  @Input()
  row: boolean = false
  private row$ = observeProperty(this, 'row')

  resizeEvent$ = new Subject<any>()
  resizeEventT$: Observable<any>
  @HostListener('window:resize')
  hostResized() {
    this.resizeEvent$.next()
  }
  resize() {
    let w = this.el.nativeElement.getBoundingClientRect().width
    this.rowItemWidth =
      w <= this.client.sizeSm ? 100 : w <= this.client.sizeMd ? 150 : 200
    console.log('resize', w, this.rowItemWidth)
    setTimeout(() => {
      this.pack()
      this.onScroll()
    }, 100)
  }

  private _rowItemWidth: number = 100
  // @Input()
  public get rowItemWidth(): number {
    return this._rowItemWidth
  }
  public set rowItemWidth(value) {
    this._rowItemWidth = value
  }
  public get rowItemHeight() {
    return this.rowItemWidth
  }

  get placeholderWidth() {
    if (!this.row) return 0
    let element: HTMLDivElement = this.el.nativeElement
    let width = element.getBoundingClientRect().width
    return width / 2 - this.rowItemHeight / 2
  }

  @HostBinding('class.row_100') get row_100() {
    return this.rowItemWidth == 100
  }
  @HostBinding('class.row_150') get row_150() {
    return this.rowItemWidth == 150
  }
  @HostBinding('class.row_200') get row_200() {
    return this.rowItemWidth == 200
  }
}

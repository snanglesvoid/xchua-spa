import {Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnInit, OnDestroy} from '@angular/core';
import {ScrollService} from '../services/scroll.service';

export type ViewportPosition = -1 | 0 | 1

function cumulativeOffset(element) {
  let top = 0
  do {
    top += element.offsetTop || 0
    element = element.offsetParent
  } while (element)
  return top
}


@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements OnInit, OnDestroy {
  public get isInViewport() {
    return this._inViewport
  }
  public set isInViewport(value: ViewportPosition) {
    if (value !== this._inViewport) {
      this._inViewport = value
      this.inViewport.emit(value)
    }
  }


  constructor(
    private el: ElementRef,
    private scroll: ScrollService
  ) {
  }

  @Input() offset: number = 0  // pixel offset for trigger
  @Input() ratio: number = 0.5 // ratio of element that needs to be in Viewport
  @Output() inViewport = new EventEmitter<ViewportPosition>();

  private _inViewport: ViewportPosition = 0

  private subscription

  // @HostListener('window:scroll', [])
  windowScrolled() {
    this.isInViewport = this.isScrolledIntoView()
  }
  ngOnInit() {
    this.windowScrolled()
    this.subscription = this.scroll.scroll.subscribe(() => this.windowScrolled())

      ; (window as any).st = this;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private isScrolledIntoView() {
    const docViewTop = window.scrollY
    const docViewBottom = docViewTop + window.innerHeight
    const elem: HTMLElement = this.el.nativeElement
    const elemTop = cumulativeOffset(elem) + this.offset
    const elemHeight = elem.offsetHeight
    const elemBottom = elemTop + elemHeight
    // return [docViewTop, docViewBottom] intersection [elemTop, elemBottom] < elemHeight * ratio
    // if (elemTop > docViewBottom || docViewTop > elemBottom) return false
    const isStart = Math.max(docViewTop, elemTop)
    const isEnd = Math.min(docViewBottom, elemBottom);
    // console.log('is scrolled into view\n',
    //   `elem top: ${elemTop}\n`,
    //   `elem bottom: ${elemBottom}\n`,
    //   `elem height: ${elemHeight}\n`,
    //   `docViewTop: ${docViewTop}\n`,
    //   `docViewBottom: ${docViewBottom}\n`,
    //   `isStart: ${isStart}\n`,
    //   `isEnd: ${isEnd}\n`,
    //   `return value: ${isEnd - isStart > elemHeight * this.ratio ? 0
    //     : elemTop > docViewTop ? 1 : -1}`
    // )
    return isEnd - isStart > elemHeight * this.ratio ? 0
      : elemTop > docViewTop ? 1 : -1;

  }

}

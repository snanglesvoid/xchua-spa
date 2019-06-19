import { Directive, Input, Output, EventEmitter, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

export type ViewportPosition = -1 | 0 | 1

function cumulativeOffset(element) {
  let top = 0
  do {
    top += element.offsetTop || 0
    element = element.offsetParent
  } while(element)
  return top
} 

;(window as any).cumulativeOffset = cumulativeOffset

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements OnInit, OnDestroy {

  @Input() offset: number = 0  // pixel offset for trigger
  @Input() ratio: number = 0.5 //ratio of element that needs to be in Viewport
  @Output() inViewport = new EventEmitter<ViewportPosition>();

  private _inViewport: ViewportPosition = 0
  public get isInViewport() {
    return this._inViewport
  }
  public set isInViewport(value: ViewportPosition) {
    if (value !== this._inViewport) {
      this._inViewport = value
      this.inViewport.emit(value)
    }
  }

  // @HostListener('window:scroll', [])
  windowScrolled() {
    this.isInViewport = this.isScrolledIntoView()
  }

  private subscription
  ngOnInit () {
    this.windowScrolled()
    this.subscription = this.scroll.scroll.subscribe(() => this.windowScrolled()) 

    ;(window as any).st = this;
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }


  constructor(
    private el: ElementRef,
    private scroll: ScrollService
  ) { 
  }

  private isScrolledIntoView() {
    let docViewTop = window.scrollY
    let docViewBottom = docViewTop + window.innerHeight
    let elem: HTMLElement  = this.el.nativeElement
    let elemTop = cumulativeOffset(elem) + this.offset
    let elemHeight = elem.offsetHeight
    let elemBottom = elemTop + elemHeight
    // return [docViewTop, docViewBottom] intersection [elemTop, elemBottom] < elemHeight * ratio
    // if (elemTop > docViewBottom || docViewTop > elemBottom) return false
    let isStart = Math.max(docViewTop, elemTop)
    let isEnd   = Math.min(docViewBottom, elemBottom)
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
      : elemTop > docViewTop ? 1 : -1
      
  }

}

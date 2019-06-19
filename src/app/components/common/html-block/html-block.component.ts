import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, AfterContentInit } from '@angular/core';
import { EasingFunctionsService } from 'src/app/services/easing-functions.service';


@Component({
  selector: 'app-html-block',
  templateUrl: './html-block.component.html',
  styleUrls: ['./html-block.component.less']
})
export class HtmlBlockComponent implements OnInit, AfterContentInit {

  
  constructor(
    private easingFunctions: EasingFunctionsService,
    private el: ElementRef
  ) { }
  
  ngOnInit() {
    ;(window as any).block = this
  }
  
  ngAfterContentInit() {
    setTimeout(() => this.onResize(), 100)
  }

  @Input() content: string

  @ViewChild('container') div: ElementRef

  @HostListener('window:resize')
  onResize() {
    this.showPrev = this.showPagePrev()
    this.showNext = this.showPageNext()
  }

  showPrev = false
  showNext = true

  scrollTo(x: number, callback = null) {
    if (x < 0) x = 0
    const duration = 1000
    const el: HTMLElement = this.div.nativeElement
    const startingX = el.scrollLeft
    const diff = x - startingX
    let start

    let step = timestamp => {
      start = (!start) ? timestamp : start
      const time = timestamp - start
      const ratio = this.easingFunctions.easeInOutQuad(Math.min(time / duration, 1))
      el.scrollTo(startingX + diff * ratio, 0)
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
      else if (callback) {
        callback()
      }
    }
    window.requestAnimationFrame(step)
  }

  get columnWidth () {
    return this.div.nativeElement.getBoundingClientRect().width + 80
  }
  nextPage() {
    // console.log('next')
    let columnWidth = this.columnWidth
    this.scrollTo(this.div.nativeElement.scrollLeft + columnWidth, () => this.onResize())
  }

  previousPage() {
    // console.log('prev')
    let columnWidth = this.columnWidth
    this.scrollTo(this.div.nativeElement.scrollLeft - columnWidth, () => this.onResize())
  }

  showPagePrev() {
    return this.div.nativeElement.scrollLeft > 0
  }

  showPageNext() {
    let el : HTMLElement = this.div.nativeElement
    // console.log(el.scrollWidth - el.scrollLeft, '>', Math.ceil(el.getBoundingClientRect().width))
    return Math.floor(el.scrollWidth - el.scrollLeft) - 10 > Math.ceil(el.getBoundingClientRect().width)
  }

}

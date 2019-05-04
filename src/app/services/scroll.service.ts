import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ScrollpaneComponent } from '../components/layout/scrollpane/scrollpane.component';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  public scrollTo(
    scrollpane: ScrollpaneComponent,
    element: string | HTMLElement,
    duration: number = 500,
    offset: number = 0
  ): Observable<any> {
    let subject = new Subject<any>()
    if (typeof element === 'string') {
      let el = document.querySelector(element as string)
      this.scrollToElement(scrollpane, el as HTMLElement, duration, offset, subject)
    }
    else if (element instanceof HTMLElement) {
      this.scrollToElement(scrollpane, element, duration, offset, subject)
    }
    else {
      subject.error('Cannot find Element')
    }
    return subject
  }

  private scrollToElement(
    scrollpane: ScrollpaneComponent,
    el: HTMLElement,
    duration: number,
    offset: number,
    subject: Subject<any>) : Observable<any>
  {
    if (el) {
      // let viewportOffset = el.getBoundingClientRect()
      // let offsetTop = viewportOffset.top
      this.doScrolling(scrollpane, offset + el.offsetTop, duration, subject)
    }
    else {
      subject.error('Cannot find Element')
    }
    return subject
  }

  private doScrolling(
    scrollpane: ScrollpaneComponent,
    elementY: number,
    duration: number,
    subject: Subject<any>
  ) {
    const startingY = scrollpane.offsetTop
    const diff = elementY - startingY
    let start
    window.requestAnimationFrame(function step(timestamp) {
      start = (!start) ? timestamp : start
      const time = timestamp - start
      let ratio = Math.min(time / duration, 1)
      scrollpane.offsetTop = startingY + diff * ratio

      if (time < duration) {
        window.requestAnimationFrame(step)
        subject.next()
      } else {
        subject.complete()
      }
    })
  }


}

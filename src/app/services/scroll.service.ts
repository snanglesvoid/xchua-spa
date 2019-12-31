import { Injectable, EventEmitter } from "@angular/core";

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  constructor() {
    // window.addEventListener('scroll', throttle((event) => {
    //   this._scrollEvent.emit(event)
    // }, 150))
    window.addEventListener("scroll", event => this._scrollEvent.emit(event));
  }

  private _scrollEvent = new EventEmitter<any>();

  public get scroll() {
    return this._scrollEvent;
  }
}

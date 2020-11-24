import {
  Component,
  OnInit,
  Input,
  HostListener,
  HostBinding
} from '@angular/core';
import {SlideshowComponent} from '../slideshow/slideshow.component';
import {SlideshowSimpleComponent} from '../slideshow-simple/slideshow-simple.component';

@Component({
  selector: 'app-slideshow-cursor-controller',
  templateUrl: './slideshow-cursor-controller.component.html',
  styleUrls: ['./slideshow-cursor-controller.component.less']
})
export class SlideshowCursorControllerComponent implements OnInit {
  @Input()
  public get slideshow() {
    return this.mSlideshow;
  }
  public set slideshow(s: SlideshowComponent | SlideshowSimpleComponent) {
    this.mSlideshow = s;
  }

  constructor() {}
  private mSlideshow: SlideshowComponent | SlideshowSimpleComponent;

  @Input()
  @HostBinding('class.small')
  small = false;

  ngOnInit() {}

  @HostListener('panleft')
  next() {
    this.slideshow.nextSlide();
  }
  @HostListener('panright')
  previous() {
    // console.log("prev", this.slideshow);
    this.slideshow.previousSlide();
  }
}

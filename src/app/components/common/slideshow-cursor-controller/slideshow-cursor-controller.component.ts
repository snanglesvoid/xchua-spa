import {
  Component,
  OnInit,
  Input,
  HostListener,
  HostBinding
} from "@angular/core";
import { SlideshowComponent } from "../slideshow/slideshow.component";
import { SlideshowSimpleComponent } from "../slideshow-simple/slideshow-simple.component";

@Component({
  selector: "app-slideshow-cursor-controller",
  templateUrl: "./slideshow-cursor-controller.component.html",
  styleUrls: ["./slideshow-cursor-controller.component.less"]
})
export class SlideshowCursorControllerComponent implements OnInit {
  private _slideshow: SlideshowComponent | SlideshowSimpleComponent;
  @Input()
  public get slideshow() {
    return this._slideshow;
  }
  public set slideshow(s: SlideshowComponent | SlideshowSimpleComponent) {
    this._slideshow = s;
  }

  constructor() {}

  ngOnInit() {}

  @HostListener("panLeft")
  next() {
    // console.log('next', this.slideshow)
    this.slideshow.nextSlide();
  }
  @HostListener("panRight")
  previous() {
    // console.log('prev', this.slideshow)
    this.slideshow.previousSlide();
  }

  @Input()
  @HostBinding("class.small")
  small: boolean = false;
}

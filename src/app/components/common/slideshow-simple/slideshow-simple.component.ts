import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit,
  HostBinding
} from "@angular/core";
import { CloudinaryImage } from "src/app/models/CloudinaryImage";
import { ImageSize } from "src/app/components/common/smart-image/smart-image.component";

@Component({
  selector: "app-slideshow-simple",
  templateUrl: "./slideshow-simple.component.html",
  styleUrls: ["./slideshow-simple.component.less"]
})
export class SlideshowSimpleComponent implements OnInit, AfterContentInit {
  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.showContent = true;
    console.log("after content init");
  }

  @HostBinding("class.visible")
  showContent = false;

  private _images: CloudinaryImage[] = [];
  @Input()
  public get images() {
    return this._images;
  }
  public set images(value: CloudinaryImage[]) {
    if (!value || value.length == 0) return;
    this._images = value.filter(x => x);
    this.currentIndex = -1;
  }

  @Input() transitionDuration = "500ms";
  @Input() imagesFit = "cover";
  @Input() imageClass = "";
  @Input() imageSize = ImageSize.SMALL;

  private _currentIndex = 0;
  public get currentIndex() {
    return this._currentIndex;
  }
  public set currentIndex(value) {
    this._currentIndex = value;
  }

  @Input()
  public get currentSlide() {
    return this.images[this._currentIndex];
  }
  public set currentSlide(slide) {
    if (!slide) {
      this._currentIndex = -1;
      return;
    }
    this._currentIndex = this.images.indexOf(slide);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  previousSlide() {
    this.currentIndex =
      (this.images.length + this.currentIndex - 1) % this.images.length;
  }

  @Output() slideChanged = new EventEmitter<any>();
  @Output() imageLoadProgress = new EventEmitter<any>();

  private _imagesLoaded = 0;
  imageLoaded(event) {
    // console.log('slideshow load progress', event)
    this._imagesLoaded++;
    this.imageLoadProgress.emit({
      loaded: this._imagesLoaded,
      total: this.images.length,
      ratio: this._imagesLoaded / this.images.length
    });
  }
}

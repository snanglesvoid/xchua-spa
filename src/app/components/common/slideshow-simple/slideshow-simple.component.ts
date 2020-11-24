import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit,
  HostBinding
} from '@angular/core';
import {CloudinaryImage} from 'src/app/models/CloudinaryImage';
import {ImageSize} from 'src/app/components/common/smart-image/smart-image.component';

@Component({
  selector: 'app-slideshow-simple',
  templateUrl: './slideshow-simple.component.html',
  styleUrls: ['./slideshow-simple.component.less']
})
export class SlideshowSimpleComponent implements OnInit, AfterContentInit {
  constructor() {}
  @Input()
  public get images() {
    return this.mImages;
  }
  public set images(value: CloudinaryImage[]) {
    if (!value || value.length === 0) {
      return;
    }
    this.mImages = value.filter(x => x);
    this.currentIndex = -1;
  }
  public get currentIndex() {
    return this.mCurrentIndex;
  }
  public set currentIndex(value) {
    this.mCurrentIndex = value;
  }

  @Input()
  public get currentSlide() {
    return this.images[this.mCurrentIndex];
  }
  public set currentSlide(slide) {
    if (!slide) {
      this.mCurrentIndex = -1;
      return;
    }
    this.mCurrentIndex = this.images.indexOf(slide);
  }

  @HostBinding('class.visible')
  showContent = false;

  private mImages: CloudinaryImage[] = [];

  @Input() transitionDuration = '500ms';
  @Input() imagesFit = 'cover';
  @Input() imageClass = '';
  @Input() imageSize = ImageSize.SMALL;

  private mCurrentIndex = 0;

  @Output() slideChanged = new EventEmitter<any>();
  @Output() imageLoadProgress = new EventEmitter<any>();

  private mImagesLoaded = 0;

  ngOnInit() {}

  ngAfterContentInit() {
    this.showContent = true;
    console.log('after content init');
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  previousSlide() {
    this.currentIndex =
      (this.images.length + this.currentIndex - 1) % this.images.length;
  }
  imageLoaded() {
    // console.log('slideshow load progress', event)
    this.mImagesLoaded++;
    this.imageLoadProgress.emit({
      loaded: this.mImagesLoaded,
      total: this.images.length,
      ratio: this.mImagesLoaded / this.images.length
    });
  }
}

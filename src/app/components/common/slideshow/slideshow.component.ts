import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit,
  ElementRef
} from '@angular/core';
import {CloudinaryImage} from 'src/app/models/CloudinaryImage';
import {animations} from './slideshow.animations';
import {ImageSize} from 'src/app/components/common/smart-image/smart-image.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.less'],
  animations
})
export class SlideshowComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input()
  get slideDuration() {
    return this.mSlideDuration;
  }
  set slideDuration(value) {
    this.mSlideDuration = value;
    this.setTransitionTimer();
  }
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
    this.mImagesLoaded = 0;
    // value.forEach(x => console.log('as: ', x.animationState.fade));
    this.images.forEach(x => (x.animationState = this.state('out')));
    this.setTransitionTimer();
  }
  @Input()
  public get currentSlide() {
    return this.mCurrentSlide;
  }
  public set currentSlide(slide) {
    // console.log('set current slide', slide)
    this.images.forEach(x => (x.animationState = this.state('out')));
    if (!slide) {
      this.mCurrentSlide = undefined;
      this.mCurrentIndex = -1;
      return;
    }
    this.mCurrentSlide = slide;
    this.mCurrentIndex = this.images.indexOf(slide);
    this.currentSlide.animationState = this.state('in');
    this.slideChanged.emit({
      image: this.currentSlide,
      index: this.currentIndex
    });
    this.currentSlideChange.emit(this.currentSlide);
  }
  @Input()
  public get currentIndex() {
    return this.mCurrentIndex;
  }
  public set currentIndex(value) {
    this.mCurrentIndex = value;
    if (value < 0) {
      this.currentSlide = undefined;
    } else if (this.images && this.images.length > 0) {
      this.currentSlide = this.images[value];
    }
  }

  constructor(private el: ElementRef<HTMLDivElement>) {}
  private mSlideDuration = -1;

  private mImages: CloudinaryImage[] = [];

  @Input() animation = 'fade';
  @Input() transitionDuration = '500ms';
  @Input() transitionEasing = 'linear';
  @Input() imageFit = 'cover';
  @Input() imageClass = '';
  @Input() imageSize = ImageSize.SMALL;

  @Output() slideChanged = new EventEmitter<{
    image: CloudinaryImage;
    index: number;
  }>();
  @Output() currentSlideChange = new EventEmitter<CloudinaryImage>();
  @Output() contentRendered = new EventEmitter<any>();
  @Output() imageLoadProgress = new EventEmitter<any>();

  private mCurrentSlide: CloudinaryImage;

  private mCurrentIndex = 0;

  private timer: any;

  private mImagesLoaded = 0;

  ngOnInit() {
    this.setTransitionTimer();
  }
  ngAfterContentInit() {
    this.contentRendered.emit('rendered');
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  setTransitionTimer() {
    if (this.timer) {clearInterval(this.timer);}
    if (this.slideDuration < 0) {return;}
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
    this.currentIndex = 0;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousSlide() {
    this.currentIndex =
      (this.images.length + this.currentIndex - 1) % this.images.length;
  }

  animationString(value: any, trigger: any) {
    if (this.animation === trigger) {
      return {
        value,
        params: {
          time: this.transitionDuration,
          easingFunction: this.transitionEasing
        }
      };
    } else {
      return {value: 'void', params: {time: '0ms', easingFunction: 'ease'}};
    }
  }

  getImageElement(index: number) {
    const element = this.el.nativeElement;
    const images = element.querySelectorAll('img');
    return images[index];
  }

  state(value: any) {
    return {
      fade: this.animationString(value, 'fade'),
      flip: this.animationString(value, 'flip'),
      slideRight: this.animationString(value, 'slideRight'),
      slideLeft: this.animationString(value, 'slideLeft')
    };
  }

  containerStyles() {
    return {
      overflow: this.animation === 'flip' ? 'visible' : 'hidden',
      perspective: this.animation === 'flip' ? '1000px' : '',
      'transform-style': this.animation === 'flip' ? 'preserve-3d' : ''
    };
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

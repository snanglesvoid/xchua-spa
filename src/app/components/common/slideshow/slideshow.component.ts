import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  AfterContentInit,
} from '@angular/core'
import { CloudinaryImage } from 'src/app/models/CloudinaryImage'
import { animations } from './slideshow.animations'
import { ImageSize } from 'src/app/components/common/smart-image/smart-image.component'

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.less'],
  animations: animations,
})
export class SlideshowComponent implements OnInit, AfterContentInit, OnDestroy {
  private _slideDuration: number = -1
  @Input()
  get slideDuration() {
    return this._slideDuration
  }
  set slideDuration(value) {
    this._slideDuration = value
    this.setTransitionTimer()
  }

  private _images: CloudinaryImage[] = []
  @Input()
  public get images() {
    return this._images
  }
  public set images(value: CloudinaryImage[]) {
    if (!value || value.length == 0) return
    this._images = value.filter(x => x)
    this.currentIndex = -1
    this._imagesLoaded = 0
    this.images.forEach(x => (x.animationState = this.state('out')))
    this.setTransitionTimer()
  }

  @Input() animation: string = 'fade'
  @Input() transitionDuration: string = '500ms'
  @Input() transitionEasing: string = 'linear'
  @Input() imageFit: string = 'cover'
  @Input() imageClass: string = ''
  @Input() imageSize: ImageSize = ImageSize.SMALL

  @Output() slideChanged = new EventEmitter<{
    image: CloudinaryImage
    index: number
  }>()
  @Output() currentSlideChange = new EventEmitter<CloudinaryImage>()
  @Output() contentRendered = new EventEmitter<any>()
  @Output() imageLoadProgress = new EventEmitter<any>()

  private _currentSlide: CloudinaryImage
  @Input()
  public get currentSlide() {
    return this._currentSlide
  }
  public set currentSlide(slide) {
    // console.log('set current slide', slide)
    this.images.forEach(x => (x.animationState = this.state('out')))
    if (!slide) {
      this._currentSlide = undefined
      this._currentIndex = -1
      return
    }
    this._currentSlide = slide
    this._currentIndex = this.images.indexOf(slide)
    this.currentSlide.animationState = this.state('in')
    this.slideChanged.emit({
      image: this.currentSlide,
      index: this.currentIndex,
    })
    this.currentSlideChange.emit(this.currentSlide)
  }

  private _currentIndex: number = 0
  @Input()
  public get currentIndex() {
    return this._currentIndex
  }
  public set currentIndex(value) {
    this._currentIndex = value
    if (value < 0) {
      this.currentSlide = undefined
    } else if (this.images && this.images.length > 0) {
      this.currentSlide = this.images[value]
    }
  }

  constructor() {}

  ngOnInit() {
    this.setTransitionTimer()
  }
  ngAfterContentInit() {
    this.contentRendered.emit('rendered')
  }
  ngOnDestroy() {
    clearInterval(this.timer)
  }

  private timer
  setTransitionTimer() {
    if (this.timer) clearInterval(this.timer)
    if (this.slideDuration < 0) return
    this.timer = setInterval(() => {
      this.nextSlide()
    }, this.slideDuration)
    this.currentIndex = 0
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length
  }

  previousSlide() {
    this.currentIndex =
      (this.images.length + this.currentIndex - 1) % this.images.length
  }

  animationString(value, trigger) {
    if (this.animation === trigger) {
      return {
        value: value,
        params: {
          time: this.transitionDuration,
          easingFunction: this.transitionEasing,
        },
      }
    } else {
      return { value: 'void', params: { time: '0ms', easingFunction: 'ease' } }
    }
  }

  state(value) {
    return {
      fade: this.animationString(value, 'fade'),
      flip: this.animationString(value, 'flip'),
      slideRight: this.animationString(value, 'slideRight'),
      slideLeft: this.animationString(value, 'slideLeft'),
    }
  }

  containerStyles() {
    return {
      overflow: this.animation == 'flip' ? 'visible' : 'hidden',
      perspective: this.animation === 'flip' ? '1000px' : '',
      'transform-style': this.animation === 'flip' ? 'preserve-3d' : '',
    }
  }

  private _imagesLoaded = 0
  imageLoaded(event) {
    // console.log('slideshow load progress', event)
    this._imagesLoaded++
    this.imageLoadProgress.emit({
      loaded: this._imagesLoaded,
      total: this.images.length,
      ratio: this._imagesLoaded / this.images.length,
    })
  }
}

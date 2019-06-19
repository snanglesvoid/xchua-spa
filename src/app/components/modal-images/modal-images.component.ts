import {
  Component,
  OnInit,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { ModalImagesService } from 'src/app/services/modal-images.service'
import { trigger, style, animate, transition } from '@angular/animations'
import { SlideshowComponent } from 'src/app/components/common/slideshow/slideshow.component'
import { ImageSize } from 'src/app/components/common/smart-image/smart-image.component'

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.less'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms 0ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('600ms 0ms ease', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalImagesComponent implements OnInit {
  constructor(public modal: ModalImagesService) {}

  ngOnInit() {
    ;(window as any).mic = this
  }

  @HostBinding('style.pointer-events')
  get pointerEvents() {
    return this.modal.isOpen ? 'all' : 'none'
  }

  @ViewChild('container') container: ElementRef

  @ViewChild(SlideshowComponent) slideshow?: SlideshowComponent

  previous(event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    }
    if (event.preventDefault) {
      event.preventDefault()
    }
    this.slideshow.previousSlide()
  }
  next(event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    }
    if (event.preventDefault) {
      event.preventDefault()
    }
    this.slideshow.nextSlide()
  }

  get artwork() {
    return this.slideshow ? this.slideshow.currentSlide.caption : undefined
  }

  get artworkTitleText() {
    return (
      this.artwork.title + (this.artwork.year ? ', ' + this.artwork.year : '')
    )
  }

  animationDone = false

  animationFinished() {
    this.animationDone = true
  }

  private _artistName(artist) {
    return artist.name.first + ' ' + artist.name.last
  }

  get artistName() {
    return this.artwork.artistName
  }

  captionClicked(event) {
    if (event.preventDefault) {
      event.preventDefault()
    }
    if (event.stopPropagation) {
      event.stopPropagation()
    }
  }

  imageSize = ImageSize.FULLSCREEN
}

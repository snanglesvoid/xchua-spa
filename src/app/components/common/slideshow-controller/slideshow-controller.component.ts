import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {
  trigger,
  query,
  stagger,
  transition,
  style,
  keyframes,
  animate,
} from '@angular/animations';
import {SlideshowComponent} from '../slideshow/slideshow.component';
import {CloudinaryImage} from 'src/app/models';

@Component({
  selector: 'app-slideshow-controller',
  templateUrl: './slideshow-controller.component.html',
  styleUrls: ['./slideshow-controller.component.less'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({opacity: 0.0}),
            stagger(150, [
              animate(
                '1s ease-out',
                keyframes([
                  style({transform: 'scale(0.0)', opacity: 0.0, offset: 0.0}),
                  style({transform: 'scale(1.5)', opacity: 1.0, offset: 0.8}),
                  style({transform: 'scale(1.0)', opacity: 1.0, offset: 1.0}),
                ])
              ),
            ]),
          ],
          {optional: true}
        ),
        query(
          ':leave',
          [
            stagger(150, [
              animate(
                '1s ease-out',
                keyframes([
                  style({transform: 'scale(1.0)', opacity: 1.0, offset: 0.0}),
                  style({transform: 'scale(1.2)', opacity: 1.0, offset: 0.8}),
                  style({transform: 'scale(0.0)', opacity: 0.0, offset: 1.0}),
                ])
              ),
            ]),
          ],
          {optional: true}
        ),
      ]),
    ]),
  ],
})
export class SlideshowControllerComponent implements OnInit {
  @Input()
  public get slideshow(): SlideshowComponent {
    return this.mSlideshow;
  }
  public set slideshow(s: SlideshowComponent) {
    this.mSlideshow = s;
  }

  constructor() {}
  private mSlideshow: SlideshowComponent;

  @Output()
  animationDone = new EventEmitter<any>();

  ngOnInit() {}

  selectImage(event: any, image: CloudinaryImage) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    this.slideshow.currentSlide = image;
  }

  isImageActive(image: CloudinaryImage) {
    if (this.slideshow) {
      return this.slideshow.currentSlide.id === image.id;
    } else {
      return false;
    }
  }

  animationDidFinish(event) {
    // console.log('animation finished')
    this.animationDone.emit(event);
  }
}

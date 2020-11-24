import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {CloudinaryImage} from 'src/app/models';
import {ClientService} from 'src/app/services/client.service';
// import { trigger, state, transition, animate, style } from '@angular/animations'

export enum ImageSize {
  FULLSCREEN = 0,
  LARGE = 1,
  HALFSCREEN = 2,
  SMALL = 3,
}

@Component({
  selector: 'app-smart-image',
  templateUrl: './smart-image.component.html',
  styleUrls: ['./smart-image.component.less'],
  animations: [
    // trigger('fade', [
    //   state('in', style({ opacity: 1 })),
    //   state('out', style({ opacity: 0 })),
    //   transition('in <=> out', animate('600ms ease')),
    // ]),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartImageComponent implements OnInit {

  constructor(private client: ClientService) {}

  @Input()
  public get size() {
    return this._size;
  }
  public set size(value: ImageSize) {
    this._size = value;
    this.resolution =
      value === ImageSize.SMALL
        ? this.client.smallImageRes
        : value === ImageSize.HALFSCREEN
          ? this.client.halfScreenImageRes
          : value === ImageSize.LARGE
            ? this.client.largeImageRes
            : value === ImageSize.FULLSCREEN
              ? this.client.fullScreenImageRes
              : this.client.smallImageRes;
  }

  get imageUrl() {
    return this.image.limit(this.resolution.width, this.resolution.height);
  }

  @Input() image: CloudinaryImage;
  @Input() imageClass = '';
  @Output() loaded = new EventEmitter<any>();
  @Output() imageClicked = new EventEmitter<SmartImageComponent>();

  private _size: ImageSize;

  loading = true;
  resolution: {width: number; height: number} = {
    width: 0,
    height: 0,
  };

  onImagesLoaded() {
    // console.log('loaded!')
    this.loading = false;
    this.loaded.emit('loaded');
  }


  click() {
    // console.log('image click')
    this.imageClicked.emit(this);
  }

  ngOnInit() {
    if (this.resolution.width === 0) {
      this.resolution = this.client.smallImageRes;
    }
  }
}

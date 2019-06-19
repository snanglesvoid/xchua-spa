import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core'
import { CloudinaryImage, Artwork } from 'src/app/models'
import { ClientService } from 'src/app/services/client.service'
import { trigger, state, transition, animate, style } from '@angular/animations'

export type ImageType = CloudinaryImage | Artwork
// export type ImageSize = 'FULLSCREEN' | 'LARGE' | 'HALFSCREEN' | 'SMALL'
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
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in <=> out', animate('600ms ease')),
    ]),
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartImageComponent implements OnInit {
  constructor(private client: ClientService, private el: ElementRef) {}

  private _image: ImageType
  @Input()
  public get image() {
    return this._image
  }
  public set image(image: ImageType) {
    this._image = image
  }

  private _loading = true
  public get loading() {
    return this._loading
  }

  onImagesLoaded() {
    setTimeout(() => {
      this._loading = false
      this.loaded.emit('loaded')
    }, 10)
  }

  @Output()
  loaded = new EventEmitter<any>()

  private _resolution: { width: number; height: number } = {
    width: 0,
    height: 0,
  }
  public get resolution() {
    return this._resolution
  }

  private _size: ImageSize
  @Input()
  public get size() {
    return this._size
  }
  public set size(value: ImageSize) {
    this._size = value
    this._resolution =
      value == ImageSize.SMALL
        ? this.client.smallImageRes
        : value == ImageSize.HALFSCREEN
        ? this.client.halfScreenImageRes
        : value == ImageSize.LARGE
        ? this.client.largeImageRes
        : value == ImageSize.FULLSCREEN
        ? this.client.fullScreenImageRes
        : this.client.smallImageRes
  }

  @HostBinding('class.hover-fx')
  hover_fx: boolean = false
  @Input()
  public get hoverFx() {
    return this.hover_fx
  }
  public set hoverFx(value) {
    this.hover_fx = value && this.client.isDesktop
  }

  @Input() imageClass: string = ''

  public get publicId() {
    return this._image instanceof Artwork
      ? this._image.image.id
      : this._image.id
  }

  public get imageExists() {
    return this.image && this.image instanceof Artwork
      ? this.image.image.exists
      : (this.image as CloudinaryImage).exists
  }

  @Output() imageLoaded = new EventEmitter<any>()
  @Output() imageClicked = new EventEmitter<SmartImageComponent>()

  click() {
    // console.log('image click')
    this.imageClicked.emit(this)
  }

  ngOnInit() {
    if (this._resolution.width == 0) {
      this._resolution = this.client.smallImageRes
    }
  }
}

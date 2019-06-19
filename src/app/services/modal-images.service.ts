import { Injectable, QueryList } from '@angular/core';
import { SmartImageComponent } from '../components/common/smart-image/smart-image.component';
import { CloudinaryImage } from '../models';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalImagesService {

  private _isOpen: boolean = false
  public get isOpen(): boolean {
    return this._isOpen
  }

  private _images: CloudinaryImage[]
  private _active: CloudinaryImage

  public get images() {
    return this._images
  }
  public get active() {
    return this._active
  }
  public set active(image: CloudinaryImage) {
    this._active = image
  }

  private _loading: boolean = true
  public get loading() { return this._loading }

  constructor(
    router: Router
  ) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.close()
      }
    });

    ;(window as any).mis = this
  }



  open(images: CloudinaryImage[], active: CloudinaryImage) {
    this._images = images
    this._active = active
    this._isOpen = true
    this._loading = true

    setTimeout(() => this._loading = false, 500)

    document.getElementById('body').style.overflow = 'hidden'
  }

  close() {
    this._images = null
    this._active = null
    this._isOpen = false

    document.getElementById('body').style.overflow = 'unset'
  }
}

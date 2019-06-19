import { Directive, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { SmartImageComponent } from '../components/common/smart-image/smart-image.component';
import { ModalImagesService } from '../services/modal-images.service';
import { CloudinaryImage } from '../models';
import { ArtworkComponent } from '../components/common/artwork/artwork.component';

@Directive({
  selector: '[modalImages]'
})
export class ModalImagesDirective implements AfterContentInit, OnDestroy {

  constructor(
    private modal: ModalImagesService
  ) { 

    ;(window as any).mid = this
  }

  @ContentChildren(SmartImageComponent, { descendants: true }) images: QueryList<SmartImageComponent>;
  @ContentChildren(ArtworkComponent, { descendants: true }) artworks: QueryList<ArtworkComponent>

  changesSubscriptions
  ngAfterContentInit() {
    console.log('modal images', this.images.length)
    this.initListeners()
    this.changesSubscriptions = [
      this.images.changes.subscribe(_ => {
        this.initListeners()
      }),
      this.artworks.changes.subscribe(_ => {
        this.initListeners()
      })
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.changesSubscriptions.forEach(x => x.unsubscribe())
  }

  subscriptions: any[] = []
  initListeners() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.subscriptions = 
      [
        ...this.images.map(x => x.imageClicked.subscribe(evt => {
          this.imageClicked(evt)
        })),
        ...this.artworks.map(x => x.image.imageClicked.subscribe(evt => {
          this.imageClicked(evt)
        }))
      ]
  }

  imageClicked(img: SmartImageComponent) {
    console.log('image clicked')
    let imgs = [
      ...this.images.map(x => (x.image as CloudinaryImage).clone()),
      ...this.artworks
        .map(x => {
          let img = (x.image.image as CloudinaryImage).clone()
          img.caption = x.artwork
          return img
        })
    ]
    let active = imgs.find(x => x.id === img.image.id)
    this.modal.open(imgs, active)
  }



}

import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { GallerySpace } from 'src/app/models/GallerySpace';

import { trigger, animate, state, style, transition } from '@angular/animations'
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-gallery-space',
  templateUrl: './gallery-space.component.html',
  styleUrls: ['./gallery-space.component.less'],
  animations: [
    trigger('text', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('500ms 500ms ease', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0}))
      ]),
    ])
  ]
})
export class GallerySpaceComponent implements OnInit {

  @Input() gallery: GallerySpace
  @Input() open: boolean

  private dataChangeSubscription

  @HostBinding('class') get classes() {
    return this.open ? 'expanded' : 'collapsed'
  }

  constructor(
    private lang: LanguageService
  ) { }

  ngOnInit() {
    this.dataChangeSubscription = this.lang.languageChanged.subscribe(() => {
      this.updateData()
    })
  }


  updateData() {
    this.gallery.translate(this.lang.language)
  }

}

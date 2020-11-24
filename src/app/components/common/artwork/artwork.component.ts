import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {Artwork} from 'src/app/models';
import {SmartImageComponent} from '../smart-image/smart-image.component';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.less'],
})
export class ArtworkComponent implements OnInit {
  constructor() {}

  @Input() artwork: Artwork;

  @Input() size: string;

  @Input() imageClass: string;

  artistLoaded = false;

  @ViewChild(SmartImageComponent) image: SmartImageComponent;
  @ViewChild('caption') captionEl: ElementRef;

  ngOnInit() {}

  captionClicked() {
    // console.log('caption clicked', this.image)
    this.image.click();
  }
}

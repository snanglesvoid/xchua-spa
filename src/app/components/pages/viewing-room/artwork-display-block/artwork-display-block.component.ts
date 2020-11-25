import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-artwork-display-block',
  templateUrl: './artwork-display-block.component.html',
  styleUrls: ['./artwork-display-block.component.less'],
})
export class ArtworkDisplayBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  @HostBinding('class.carousel')
  public get isCarousel() {
    return this.block && this.block.layout === 'Carousel';
  }

  @HostBinding('class.columns')
  public get isColumns() {
    return this.block && this.block.layout === 'Columns';
  }

  constructor() {}

  ngOnInit() {

  }

  public get artworks() {
    return this.block.artworks || [];
  }
}

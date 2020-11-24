import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-artwork-display-block',
  templateUrl: './artwork-display-block.component.html',
  styleUrls: ['./artwork-display-block.component.less']
})
export class ArtworkDisplayBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor() {}

  ngOnInit() {

  }

  public get artworks() {
    return this.block.artworks || [];
  }
}

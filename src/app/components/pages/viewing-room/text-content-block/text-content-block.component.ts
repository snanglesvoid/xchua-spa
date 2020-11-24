import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-text-content-block',
  templateUrl: './text-content-block.component.html',
  styleUrls: ['./text-content-block.component.less']
})
export class TextContentBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor() {}

  ngOnInit() {
  }

}

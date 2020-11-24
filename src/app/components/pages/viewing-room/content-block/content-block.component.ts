import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.less']
})
export class ContentBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor() {}

  ngOnInit() {
  }

}

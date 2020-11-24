import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';

@Component({
  selector: 'app-quote-block',
  templateUrl: './quote-block.component.html',
  styleUrls: ['./quote-block.component.less']
})
export class QuoteBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor() {}

  ngOnInit() {
  }

}

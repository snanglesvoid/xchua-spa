import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-title-image-block',
  templateUrl: './title-image-block.component.html',
  styleUrls: ['./title-image-block.component.less']
})
export class TitleImageBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  public get safeText() {
    return this.sanitizer.bypassSecurityTrustHtml(this.block.text);
  }

}

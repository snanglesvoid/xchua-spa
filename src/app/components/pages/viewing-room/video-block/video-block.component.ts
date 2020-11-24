import {Component, OnInit, Input} from '@angular/core';
import {ContentBlock} from 'src/app/models/ViewingRoom';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.less']
})
export class VideoBlockComponent implements OnInit {

  @Input() block: ContentBlock;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  get safeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.block.vimeoLink);
  }

}

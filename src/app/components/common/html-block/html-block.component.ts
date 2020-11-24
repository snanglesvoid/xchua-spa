import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  HostBinding
} from '@angular/core';

import {observeProperty} from 'src/app/lib/observeProperty';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-html-block',
  templateUrl: './html-block.component.html',
  styleUrls: ['./html-block.component.less']
})
export class HtmlBlockComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  get safeContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  @Input() content: string;
  content$ = observeProperty(this, 'content');

  @ViewChild('container') div: ElementRef;

  @HostBinding('class.collapsed')
  @Input()
  collapsed = false;

  ngOnInit() {

  }
}

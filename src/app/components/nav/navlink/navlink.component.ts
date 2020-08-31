import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {LanguageService} from 'src/app/services/language.service';
import {NavColorService} from 'src/app/services/nav-color.service';

@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styleUrls: ['./navlink.component.less']
})
export class NavlinkComponent implements OnInit {
  @Input() href: string;
  @Input() section: string;
  @Input() snippet: string;

  @Output() clicked = new EventEmitter<any>();

  @Input() active = false;

  paddingRight = '16px';
  paddingLeft = '24px';

  constructor(public language: LanguageService, public nav: NavColorService) {}

  ngOnInit() {
    this.updatePadding();
    this.language.languageChanged.subscribe((_: any) => {
      this.updatePadding();
    });
  }

  @HostListener('window:resize')
  updatePadding() {
    if (window.innerWidth < 1032) {
      this.paddingLeft = '8px';
      this.paddingRight = '0px';
      return;
    }
    if (this.language.language === 'german') {
      this.paddingLeft = this.paddingRight = '8px';
    } else {
      this.paddingLeft = '32px';
      this.paddingRight = '16px';
    }
  }

  linkClicked($event: any) {
    this.clicked.emit($event);
  }

}

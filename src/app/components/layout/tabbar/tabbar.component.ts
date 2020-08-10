import {Component, OnInit, OnDestroy, HostBinding, HostListener, AfterContentInit, ElementRef} from '@angular/core';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.less']
})
export class TabbarComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor(private lang: LanguageService, private el: ElementRef<HTMLDivElement>) {}

  @HostBinding('class.german')
  german = false;
  sub: any;
  left = 0;

  ngOnInit() {
    this.german = this.lang.language === 'german';
    this.sub = this.lang.languageChanged.subscribe((_: any) => {
      this.german = this.lang.language === 'german';
    });
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.resize();
    }, 100);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  resize() {
    const nav = document.getElementById('nav');
    const active: HTMLElement = nav.querySelectorAll('.active:not(.lang)').item(0) as HTMLElement;
    if (active) {
      this.left = active.getBoundingClientRect().left;
    } else {
      this.left = 0;
    }
    console.log('resize', this.left);
    const ul: HTMLUListElement = this.el.nativeElement.querySelector('.tabs');
    ul.style.marginLeft = `${this.left}px`;
  }
}

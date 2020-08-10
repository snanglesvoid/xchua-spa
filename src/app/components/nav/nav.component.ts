import {Component, OnInit} from '@angular/core';
import {trigger} from '@angular/animations';
import {Router, ActivationStart} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less'],
  animations: [trigger('open-close', [])]
})
export class NavComponent implements OnInit {

  constructor(private router: Router) {
    (window as any).nav = this;
  }
  isOpen = false;
  section: string;
  background = 'white';

  contactHover = false;

  ngOnInit() {
    this.router.events
      .pipe(filter(x => x instanceof ActivationStart))
      .subscribe((event: ActivationStart) => {
        const url = event.snapshot.url;
        console.log(url);
        if (url.length === 0) {
          this.section = 'home';
        } else {
          this.section = url[0].path;
        }
      });
  }

  navToggled(event: any) {
    // console.log('nav toggled', event)
    this.isOpen = event;
    if (this.isOpen) {
      const pageElements = document.querySelectorAll('.full-page, .page');
      console.log(pageElements);
      for (let i = 0; i < pageElements.length; ++i) {
        (pageElements[i] as HTMLDivElement).style.filter = 'grayscale(1)';
      }
    } else {
      const pageElements = document.querySelectorAll('.full-page, .page');
      for (let i = 0; i < pageElements.length; ++i) {
        (pageElements[i] as HTMLDivElement).style.filter = 'grayscale(0)';
      }
    }
  }
}

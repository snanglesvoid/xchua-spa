import {Component, OnInit} from '@angular/core';
import {trigger} from '@angular/animations';
import {Router, ActivationStart} from '@angular/router';
import {filter} from 'rxjs/operators';
import {NavColorService} from '../../services/nav-color.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less'],
  animations: [trigger('open-close', [])]
})
export class NavComponent implements OnInit {

  constructor(private router: Router, public navC: NavColorService) {

  }

  isOpen = false;
  section: string;

  contactHover = false;

  private bcolor: string;
  private tcolor: string;

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

      pageElements.forEach((e: HTMLDivElement) => {
        e.style.filter = 'grayscale(1)';
      });

      this.bcolor = this.navC.backgroundColor;
      this.tcolor = this.navC.textColor;
      this.navC.textColor = 'black';
      this.navC.backgroundColor = 'white';
    } else {

      const pageElements = document.querySelectorAll('.full-page, .page');
      pageElements.forEach((e: HTMLDivElement) => {
        e.style.filter = 'grayscale(0)';
      });

      this.navC.backgroundColor = this.bcolor || this.navC.backgroundColor;
      this.navC.textColor = this.tcolor || this.navC.textColor;
    }
  }
}

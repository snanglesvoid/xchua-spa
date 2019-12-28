import { Component, OnInit } from "@angular/core";
import { trigger } from "@angular/animations";
import { Router, ActivationStart } from "@angular/router";
import { filter, tap } from "rxjs/operators";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.less"],
  animations: [trigger("open-close", [])]
})
export class NavComponent implements OnInit {
  isOpen: boolean = false;
  section: string;

  constructor(private router: Router) {
    (window as any).nav = this;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(x => x instanceof ActivationStart))
      .subscribe((event: ActivationStart) => {
        let url = event.snapshot.url;
        console.log(url);
        if (url.length === 0) {
          this.section = "home";
        } else {
          this.section = url[0].path;
        }
      });
  }

  navToggled(event) {
    // console.log('nav toggled', event)
    this.isOpen = event;
    if (this.isOpen) {
      let pageElements = document.querySelectorAll(".full-page, .page");
      console.log(pageElements);
      for (let i = 0; i < pageElements.length; ++i) {
        (pageElements[i] as HTMLDivElement).style.filter = "grayscale(1)";
      }
    } else {
      let pageElements = document.querySelectorAll(".full-page, .page");
      for (let i = 0; i < pageElements.length; ++i) {
        (pageElements[i] as HTMLDivElement).style.filter = "grayscale(0)";
      }
    }
  }
}

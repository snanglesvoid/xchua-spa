import { Component, OnInit, Input } from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.less"],
  animations: [
    trigger("position", [
      state("normal", style({})),
      state("big", style({})),
      transition("small <=> big", animate("600ms ease"))
    ])
  ]
})
export class PageHeaderComponent implements OnInit {
  @Input() big = false;
  @Input() color = "white";

  get bottomShadow() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `0px -7px 29px 23px ${this.color}`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // console.log('page header init')
    window.scroll(0, 0);
  }
}

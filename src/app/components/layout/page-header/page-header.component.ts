import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy
} from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";
import { DomSanitizer } from "@angular/platform-browser";
import { LanguageService } from "src/app/services/language.service";

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
export class PageHeaderComponent implements OnInit, OnDestroy {
  @Input() big = false;
  @Input() color = "white";

  get bottomShadow() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `0px -7px 29px 23px ${this.color}`
    );
  }

  constructor(private sanitizer: DomSanitizer, private lang: LanguageService) {}

  ngOnInit() {
    // console.log('page header init')
    window.scroll(0, 0);

    this.german = this.lang.language == "german";
    this.sub = this.lang.languageChanged.subscribe(_ => {
      this.german = this.lang.language == "german";
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  sub: any;
  @HostBinding("class.german")
  german = false;
}

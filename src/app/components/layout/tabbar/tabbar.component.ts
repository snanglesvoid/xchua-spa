import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-tabbar",
  templateUrl: "./tabbar.component.html",
  styleUrls: ["./tabbar.component.less"]
})
export class TabbarComponent implements OnInit, OnDestroy {
  constructor(private lang: LanguageService) {}

  ngOnInit() {
    this.german = this.lang.language === "german";
    this.sub = this.lang.languageChanged.subscribe(_ => {
      this.german = this.lang.language === "german";
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  @HostBinding("class.german")
  german = false;
  sub: any;
}

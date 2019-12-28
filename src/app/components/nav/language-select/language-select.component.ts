import { Component, OnInit } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-language-select",
  templateUrl: "./language-select.component.html",
  styleUrls: ["./language-select.component.less"]
})
export class LanguageSelectComponent implements OnInit {
  constructor(private lang: LanguageService) {}

  public get language() {
    return this.lang.language;
  }

  ngOnInit() {}

  switchLang(language) {
    console.log(language);
    this.lang.language = language;
  }
}

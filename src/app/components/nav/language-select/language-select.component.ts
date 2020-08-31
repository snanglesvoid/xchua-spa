import {Component, OnInit} from '@angular/core';
import {LanguageService} from 'src/app/services/language.service';
import {NavColorService} from 'src/app/services/nav-color.service';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.less']
})
export class LanguageSelectComponent implements OnInit {
  constructor(private lang: LanguageService, public nav: NavColorService) {}

  public get language() {
    return this.lang.language;
  }

  ngOnInit() {}

  switchLang(language: any) {
    console.log(language);
    this.lang.language = language;
  }
}

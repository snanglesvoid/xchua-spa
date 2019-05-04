import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.less']
})
export class LanguageSelectComponent implements OnInit {

  language: string = 'english'

  constructor() { }

  ngOnInit() {

  }

  switchLang(language) {
    this.language = language
  }

}
 
import { Injectable, EventEmitter } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'

export type Language = 'english' | 'german' | 'chinese'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private cookie: CookieService) {
    ;(window as any).languageService = this

    let languageCookie = this.cookie.get('language')
    if (languageCookie) {
      this._lang = languageCookie as Language
    } else {
      this._lang = 'english'
      if (this.cookie.get('consent')) {
        this.cookie.set('language', 'english', 365)
      } else {
        console.warn('no cookie consent')
      }
    }
    if (this._lang == 'chinese') {
      document.title = '户尔空间'
    }
  }

  private _lang: Language
  public languageChanged = new EventEmitter<Language>()
  public get language() {
    return this._lang
  }
  public set language(value: Language) {
    this._lang = value
    if (this.cookie.get('consent')) {
      this.cookie.set('language', value, 365)
    } else {
      console.warn('no cookie consent')
    }
    if (value == 'chinese') {
      document.title = '户尔空间'
    } else {
      document.title = 'XC.HuA'
    }
    this.languageChanged.emit(value)
  }
}

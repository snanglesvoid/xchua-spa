import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'
import { LanguageService } from './language.service'
import { Textblock, TextblockModel } from '../models/Textblock'
import { ApiService } from './api.service'

const apiPrefix = environment.apiPrefix

const missingSnippet = {
  slug: 'missing',
  content: {
    english: 'Snippet Missing',
  },
}

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private snippets: any

  constructor(
    private http: HttpClient,
    private lang: LanguageService,
    private api: ApiService
  ) {
    this.fetch()
    ;(window as any).snippet = this
  }

  private loaded = new EventEmitter<any>()

  public waitForLoad(): Promise<any> {
    if (this.snippets) return Promise.resolve()
    else
      return new Promise((resolve, reject) => {
        this.loaded.subscribe(_ => resolve())
      })
  }

  private fetch() {
    return new Promise((resolve, reject) => {
      this.http.get(apiPrefix + '/snippets').subscribe(
        (response: any[]) => {
          this.snippets = {}
          response.forEach(s => {
            this.snippets[s.slug] = s
          })
          this.loaded.emit('loaded')
          return resolve('fetched')
        },
        error => {
          console.error(error)
          return reject(error)
        }
      )
    })
  }

  public snippetText(slug, lang): Promise<string> {
    if (this.snippets) {
      let snippet =
        this.snippets[slug] || { slug: slug, content: { english: slug } } ||
        missingSnippet
      return Promise.resolve(
        snippet.content[lang] || snippet.content['english'] || ''
      )
    } else {
      return Promise.reject('No Snippets')
    }
  }

  public snippetTextSync(slug, lang): string {
    if (this.snippets) {
      let snippet =
        this.snippets[slug] || { slug: slug, content: { english: slug } } ||
        missingSnippet
      return snippet.content[lang] || snippet.content['english'] || ''
    } else {
      return '...'
    }
  }

  public getTextblock(slug): Promise<Textblock> {
    return new Promise((resolve, reject) => {
      this.http.get(apiPrefix + '/text/' + slug).subscribe(
        data => {
          let res = new Textblock(this.api, data as TextblockModel)
          res.translate(this.lang.language)
          return resolve(res)
        },
        error => {
          return reject(error)
        }
      )
    })
  }
}

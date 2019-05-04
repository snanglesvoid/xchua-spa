import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

const apiPrefix = environment.apiPrefix

const missingSnippet = {
  slug: 'missing', content: { 
    english: 'Snippet Missing'
  }
}

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  private snippets: any

  constructor(
    private http: HttpClient
  ) { 
    this.fetch()
  }

  private loaded = new EventEmitter<any>()

  public waitForLoad(): Promise<any> {
    if (this.snippets) return Promise.resolve()
    else return new Promise((resolve, reject) => {
      this.loaded.subscribe(_ => resolve())
    })  
  }

  private fetch() {
    return new Promise((resolve, reject) => {
      this.http.get(apiPrefix + '/snippets')
        .subscribe(
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
          })
    })
  }

  public snippetText(slug, lang): Promise<string> {
    if (this.snippets) {
      let snippet = (this.snippets[slug] || missingSnippet)
      return Promise.resolve(snippet.content[lang] || snippet.content['english'] || '')
    }
    else {
      return Promise.reject('No Snippets')
    }
  }
}

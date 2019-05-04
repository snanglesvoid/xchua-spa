import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LanguageService, Language } from './language.service'

import { environment } from '../../environments/environment'

const apiPrefix = environment.apiPrefix

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _artists: any[]
  private artistsLoaded = new EventEmitter<any>()
  public get artists() {
    return this._artists
  }

  constructor(
    public http: HttpClient,
    private lang: LanguageService,
  ) { 
    this.fetchArtists()
  }

  public waitForArtists() {
    if (this.artists && this.artists.length > 0) return Promise.resolve()
    else return new Promise((resolve, reject) => {
      this.artistsLoaded.subscribe(_ => resolve())
    })
  }
  private fetchArtists() {
    return new Promise((resolve, reject) => {
      this.http.get(apiPrefix + '/artists')
        .subscribe(
          (response: any[]) => {
            this._artists = response
            this.artistsLoaded.emit('artists loaded')
            return resolve('artists loaded')
          }),
          error => {
            console.error(error)
            return reject(error)
          }
    })
  }
}

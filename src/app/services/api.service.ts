import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LanguageService, Language } from './language.service'

import { environment } from '../../environments/environment'

import {
  Model,
  Name,
  ArtistModel,
  Artist,
  ArtworkModel,
  Artwork,
  GallerySpaceModel,
  GallerySpace,
  ExhibitionModel,
  Exhibition,
  FrontPageImageModel,
  FrontPageImage,
  PostModel,
  Post,
  FairModel,
  Fair,
  ArtworkSeries,
  ArtworkSeriesModel,
} from '../models'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LibArticle, LibArticleModel } from '../models/LibArticle'

const apiPrefix = environment.apiPrefix

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient, public lang: LanguageService) {
    this.initControllers()
    ;(window as any).api = this
  }

  initControllers() {
    this.frontPageImages = new Controller<FrontPageImageModel, FrontPageImage>(
      this,
      '/front-page-images',
      FrontPageImage
    )
    this.artists = new Controller<ArtistModel, Artist>(this, '/artists', Artist)
    this.artist = new Controller<ArtistModel, Artist>(this, '/artist', Artist)
    this.exhibitions = new Controller<ExhibitionModel, Exhibition>(
      this,
      '/exhibitions',
      Exhibition
    )
    this.news = new Controller<PostModel, Post>(this, '/blog/news', Post)
    this.gallerySpaces = new Controller<GallerySpaceModel, GallerySpace>(
      this,
      '/gallery-spaces',
      GallerySpace
    )
    this.fairs = new Controller<FairModel, Fair>(this, '/fairs', Fair)
    this.artworks = new Controller<ArtworkModel, Artwork>(
      this,
      '/artworks',
      Artwork
    )
    this.artworkSeries = new Controller<ArtworkSeriesModel, ArtworkSeries>(
      this,
      '/artwork-series',
      ArtworkSeries
    )
    this.libArticles = new Controller<LibArticleModel, LibArticle>(
      this,
      '/lib-articles',
      LibArticle
    )
  }

  public frontPageImages: Controller<FrontPageImageModel, FrontPageImage>
  public artist: Controller<ArtistModel, Artist>
  public artists: Controller<ArtistModel, Artist>
  public exhibitions: Controller<ExhibitionModel, Exhibition>
  public news: Controller<PostModel, Post>
  public gallerySpaces: Controller<GallerySpaceModel, GallerySpace>
  public fairs: Controller<FairModel, Fair>
  public artworks: Controller<ArtworkModel, Artwork>
  public artworkSeries: Controller<ArtworkSeriesModel, ArtworkSeries>
  public libArticles: Controller<LibArticleModel, LibArticle>

  public get apiPrefix() {
    return environment.apiPrefix
  }
}

class Controller<M, T extends Model> {
  private _data: T[] = []
  private loaded: EventEmitter<any> = new EventEmitter<any>()
  private requested: boolean
  public dataChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private api: ApiService,
    private apiRoute: String,
    private c: new (api: ApiService, m) => T
  ) {
    this.api.lang.languageChanged.subscribe(event => {
      this._data.forEach(x => x.translate(event))
      this.dataChanged.emit(this)
    })
  }

  private fetch(): Promise<string> {
    this.requested = true
    return new Promise((resolve, reject) => {
      this.api.http.get(apiPrefix + this.apiRoute).subscribe(
        (response: M[]) => {
          this._data = response.map((x: M) => new this.c(this.api, x))
          this._data.forEach(x => x.translate(this.api.lang.language))
          let event = 'controller data loaded: ' + this.c.name
          this.loaded.emit(event)
          return resolve(event)
        },
        error => {
          console.error('error in controller: ' + this.c.name + '\n', error)
          return reject(error)
        }
      )
    })
  }

  public async waitForData(): Promise<T[]> {
    if (this.data && this.data.length > 0) return Promise.resolve(this._data)
    else if (!this.requested) {
      try {
        await this.fetch()
        return Promise.resolve(this._data)
      } catch (error) {
        return Promise.reject(error)
      }
    } else
      return new Promise((resolve, reject) => {
        this.loaded.subscribe(_ => resolve(this._data))
      })
  }

  public withArgs(id: string): Observable<T[]> {
    return this.api.http.get(apiPrefix + this.apiRoute + '/' + id).pipe(
      map((response: M[]) =>
        response.map(data => {
          let t = new this.c(this.api, data)
          t.translate(this.api.lang.language)
          return t
        })
      )
    )
  }

  public get data() {
    return this._data
  }
}

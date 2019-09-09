import { CloudinaryImageModel, CloudinaryImage } from './CloudinaryImage'
import { Model } from './Model'
import { Language } from '../services/language.service'
import { ApiService } from '../services/api.service'

export interface LibArticleModel {
  _id: string
  slug: string
  title: { english: string; german?: string; chinese?: string }
  picture: CloudinaryImageModel
  pictures: CloudinaryImageModel[]
  description: { english?: string; chinese?: string; german?: string }
  size: number
  width: number
  x: number
  y: number
  z: number
  rotation: {
    x: number
    y: number
    z: number
  }
}

export interface ShelfRowModel {
  _id: string
  index: number
  height: number
  items: LibArticleModel[]
}

export class LibArticle extends Model {
  constructor(api: ApiService, private model: LibArticleModel) {
    super(api)
    this._picture = new CloudinaryImage(
      api,
      model.picture as CloudinaryImageModel
    )
    this._pictures =
      model.pictures && model.pictures.length
        ? model.pictures.map(p => new CloudinaryImage(api, p))
        : []
  }

  public get id() {
    return this.model._id
  }
  public get slug() {
    return this.model.slug
  }

  private _picture: CloudinaryImage
  public get picture() {
    return this._picture
  }

  private _pictures: CloudinaryImage[]
  public get pictures() {
    return this._pictures
  }

  private _title: string
  public get title() {
    return this._title
  }

  private _description: string
  public get description() {
    return this._description
  }

  public get size() {
    return this.model.size
  }
  public get width() {
    return this.model.width
  }

  public get x() {
    return this.model.x
  }
  public get y() {
    return this.model.y
  }
  public get z() {
    return this.model.z
  }
  public get rotation() {
    return this.model.rotation
  }

  public translate(language: Language) {
    this._title = this.model.title[language] || this.model.title.english
    this._description = this.model.description
      ? this.model.description[language] || this.model.description.english || ''
      : ''
  }
}

export class ShelfRow extends Model {
  constructor(api: ApiService, private model: ShelfRowModel) {
    super(api)
    this._items = this.model.items.map(x => new LibArticle(api, x))
  }

  private _items: LibArticle[]
  public get items() {
    return this._items
  }

  public get id() {
    return this.model._id
  }
  public get height() {
    return this.model.height
  }
  public get index() {
    return this.model.index
  }

  public translate(language: Language) {
    this._items.forEach(x => x.translate(language))
  }
}

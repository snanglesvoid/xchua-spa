import { CloudinaryImage, CloudinaryImageModel } from './CloudinaryImage'
import { ArtistModel, Artist } from './Artist'
import { Language } from '../services/language.service'
import { Model } from './Model'
import { ApiService } from '../services/api.service';

export interface ArtworkModel {
    _id           : string,
    slug          : string,
    title         : {
                      english  : string,
                      german?  : string,
                      chinese? : string,
                    },
    image?        : CloudinaryImageModel,
    pictures?     : CloudinaryImageModel[],
    year?         : string,
    description   : {
                      english? : string
                      german?  : string
                      chinese? : string
                    },
    dimensions?   : string
    price?        : string
    availability  : boolean
    artist        : ArtistModel | string
  }

export class Artwork extends Model {
    constructor(api: ApiService, private model: ArtworkModel) {
      super(api)
      this._image = new CloudinaryImage(this.api, model.image)
    }
  
    public get id() { return this.model._id }
    public get slug() { return this.model.slug }
    private _title = this.model.title.english
    public get title() { return this._title }
    private _description = this.model.description.english || ''
    public get description() { return this._description }
    private _image: CloudinaryImage
    public get image() { return this._image }
    private _pictures: CloudinaryImage[] = []
    public get pictures() { return this._pictures }
    public get year() { return this.model.year || '' }
    public get dimensions() { return this.model.dimensions || '' }
    public get price() { return this.model.price || '' }
    public get availability() { return this.model.availability }
    private _artist: string | Artist
    public get artist() { return this._artist }
    
    public translate(language: Language) {
      super.translate(language)
      this._title = this.model.title[language] || this.model.title.english
      this._description = this.model.description[language] || this.model.description.english || ''
      if (this.artist instanceof Artist) this.artist.translate(language)
    }

    public populate(field: string) {
        if (field === 'artist') {
            if (this.artist instanceof Artist) {
                return Promise.resolve('Already populated')
            }
            //TODO
            return Promise.reject('Not implemented')
        }
        else {
            return Promise.reject('Unknown Field Name: '+ field)
        }
    }
  }
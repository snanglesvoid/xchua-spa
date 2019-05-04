import { Name, Model } from './Model'
import { CloudinaryImageModel, CloudinaryImage } from './CloudinaryImage'
import { ArtworkModel, Artwork } from './Artwork'
import { Language } from '../services/language.service';
import { ApiService } from '../services/api.service';
import { ArtworkSeries } from './ArtworkSeries';

export type ArtistType = 'resident' | 'guest'

export interface ArtistModel {
    _id           : string,
    slug          : string,
    name          : {
                    english: Name,
                    german?: Name,
                    chinese?: Name
                  },
    artistType    : ArtistType,
    biography     : {
                    english: string,
                    german?: string,
                    chinese?: string,
                  },
    picture?      : CloudinaryImageModel,
    thumbnail?    : CloudinaryImageModel,
    selectedWork? : ArtworkModel | string,
    listPriority  : number
}

export class Artist extends Model {
    constructor (api: ApiService , private model: ArtistModel) {
        super(api)
        if (model.selectedWork && typeof model.selectedWork !== 'string') {
            this._selectedWork = new Artwork(api, model.selectedWork as ArtworkModel)
        }
        else {
            this._selectedWork = model.selectedWork
        }
    }

    public get id() { return this.model._id }
    private _name: Name
    public get slug() { return this.model.slug }
    public get name() { return this._name }
    public get artistType() { return this.model.artistType }
    private _biography: string
    public get biography() { return this._biography}
    private _picture: CloudinaryImage
    public get picture() { return this._picture }
    private _thumbnail: CloudinaryImage
    public get thumbnail() { return this._thumbnail }
    private _selectedWork? : Artwork | string

    private _artworks? : Artwork[]
    public get artworks() { return this._artworks }
    private _series? : ArtworkSeries[]
    private _exhibitions? : Exhibition[]
    private _fairs? : Fair[]

    translate(language: Language) {
        super.translate(language)
        this._name = this.model.name[language] || this.model.name.english
        this._biography = this.model.biography[language] || this.model.biography.english || ''
        this._picture = new CloudinaryImage(this.api, this.model.picture)
        this._thumbnail = new CloudinaryImage(this.api, this.model.thumbnail)
        if (this._selectedWork instanceof Artwork) {
            this._selectedWork.translate(language)
        }
        if (this._artworks) {
            this._artworks.forEach(a => a.translate(language))
        }
        if (this._series) {
            this._series.forEach(x => x.translate(language))
        }
        if (this._exhibitions) {
            this._exhibitions.forEach(x => x.translate(language))
        }
        if (this._fairs) {
            this._fairs.forEach(x => x.translate(language))
        }
    }

    populate (field: string) {
        if (field === 'selectedWork') {
            if (this._selectedWork instanceof Artwork) {
                return Promise.resolve('Already populated')
            }
            else {
                //TODO
                return Promise.reject('Not implemented')
            }
        }
        else if (field === 'artworks') {
            return Promise.reject('Not implemented')
        }
        else if (field === 'series') {
            return Promise.reject('Not implemented')
        }
        else if (field === 'exhibitions') {
            return Promise.reject('Not implemented')
        }
        else if (field === 'fairs') {
            return Promise.reject('Not implemented')
        }
        else {
            return Promise.reject('Unknown field name: ' + field)
        }
    }
}
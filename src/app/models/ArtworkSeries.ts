import { Model } from './model'
import { Language } from '../services/language.service'
import { ArtistModel, Artist } from './Artist';
import { ArtworkModel, Artwork } from './Artwork'
import { ApiService } from '../services/api.service';

export interface ArtworkSeriesModel {
    _id          : string
    slug         : string
    title        : { english: string, german?: string, chinese?: string }
    artist       : ArtistModel | string
    artworks     : (ArtworkModel | string)[]
    selectedWork : ArtworkModel | string
}

export class ArtworkSeries extends Model {
    constructor(api: ApiService, private model: ArtworkSeriesModel) {
        super(api)
        if (typeof model.artist === 'string') {
            this._artist = model.artist
        }
        else {
            this._artist = new Artist(api, model.artist as ArtistModel)
        }
        if (typeof model.selectedWork === 'string') {
            this._selectedWork = model.selectedWork
        }
        else  { 
            this._selectedWork = new Artwork(api, model.selectedWork as ArtworkModel)
        }
    }

    public get id() { return this.model._id }
    public get slug() { return this.model.slug }
    private _title: string
    public get title() { return this._title }
    private _artist : Artist | string
    public get artist() { return this._artist }
    private _selectedWork : Artwork | string
    public get selectedWork() { return this._selectedWork }

    translate(language: Language) {
        this._title = this.model.title[language] || this.model.title.english
    }

    populate(field: string) {
        return Promise.reject('Not implemented')
    }
}
import { Model } from './Model'

export interface ExhibitionModel {
    _id : string
    slug: string
    title: { english: string, german?: string, chinese?: string }
    date: { start: Date, end: Date },
    text: { english?: string, german?: string, chinese? string },
    location: GallerySpaceModel | string
    artists: (ArtistModel | string)[]
    coverPicture?: CloudinaryImageModel
    pictures: CloudinaryImageModel[] 
    artworks: (ArtworkModel | string)[]
}

export class Exhibition extends Model {

}
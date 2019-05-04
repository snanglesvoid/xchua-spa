import { Model } from './Model';
import { Language } from '../services/language.service';
import { ApiService } from '../services/api.service';

export interface CloudinaryImageModel {
    _id: string
}

export class CloudinaryImage extends Model {

    constructor(api: ApiService, private model?: CloudinaryImageModel) {
        super(api)
    }

    public get id() { return this.model ? this.model._id : '' }
    public get exists() { return this.model !== undefined }

    translate(language: Language) {}
}
import {Model} from './Model';
import {ApiService} from '../services/api.service';
import {Language} from '../services/language.service';
import {CloudinaryImageModel, CloudinaryImage} from './CloudinaryImage';

export type TextPlacement = 'left' | 'right' | 'center' | 'top';

export interface FrontPageImageModel {
  _id: string;
  title: {english: string; german?: string; chinese?: string};
  subtitle: {english?: string; german?: string; chinese?: string};
  caption: {english?: string; german?: string; chinese?: string};
  linkUrl?: string;
  textColor: string;
  navColor: string;
  customColor?: string;
  textPlacement: TextPlacement;
  image: CloudinaryImageModel;
  listPriority: number;
  currentExhibition: boolean;
}

export class FrontPageImage extends Model {
  constructor(api: ApiService, private model: FrontPageImageModel) {
    super(api);

    this._image = new CloudinaryImage(api, model.image);
  }

  public get id() {
    return this.model._id;
  }

  private _title: string;
  public get title() {
    return this._title;
  }
  private _subtitle: string;
  public get subtitle() {
    return this._subtitle;
  }
  private _caption: string;
  public get caption() {
    return this._caption;
  }
  private _image: CloudinaryImage;
  public get image() {
    return this._image;
  }
  public get linkUrl() {
    return this.model.linkUrl || '#';
  }
  public get textColor() {
    return this.model.textColor;
  }
  public get navColor() {
    return this.model.navColor;
  }
  public get customColor() {
    return this.model.customColor;
  }
  public get textPlacement() {
    return this.model.textPlacement;
  }
  public get listPriority() {
    return this.model.listPriority;
  }
  public get currentExhibition() {
    return this.model.currentExhibition;
  }

  translate(language: Language) {
    this._title = this.model.title[language] || this.model.title.english;
    this._subtitle =
      this.model.subtitle[language] || this.model.subtitle.english || '';
    this._caption =
      this.model.caption[language] || this.model.caption.english || '';
  }
}

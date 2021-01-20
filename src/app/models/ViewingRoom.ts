import {CloudinaryImageModel, CloudinaryImage} from './CloudinaryImage';
import {ArtworkModel, Artwork} from './Artist';
import {ApiService} from '../services/api.service';
import {Language} from '../services/language.service';
import {Model} from './Model';

export type ContentBlockType = 'Title Image' | 'Artwork Display' | 'Quote' | 'Text' | 'Video';
export type ArtworkDisplayLayout = 'Image Top' | 'Image Left' | 'Image Right' | 'Columns' | 'Carousel';
export type TextColorType = 'bright' | 'dark' | 'custom';

export interface ContentBlockModel {
  _id: string;
  title: {
    english: string,
    german?: string,
    chinese?: string,
  };
  type: ContentBlockType;
  image?: CloudinaryImageModel;
  headline?: {
    english: string,
    german?: string,
    chinese?: string,
  };
  text?: {
    english: string,
    german?: string,
    chinese?: string,
  };
  artworks?: Array<ArtworkModel | string>;
  layout?: ArtworkDisplayLayout;
  textColor?: TextColorType;
  customColor?: string;
  vimeoLink?: string;
}

export class ContentBlock extends Model {
  constructor(api: ApiService, private model: ContentBlockModel) {
    super(api);
    if (model.image) {
      this._image = new CloudinaryImage(api, model.image);
    }
    this._artworks =
      model.artworks && model.artworks.length
        ? model.artworks
          .filter(x => typeof x !== 'string')
          .map(x => new Artwork(api, x as ArtworkModel))
        : [];
  }

  public get id() {
    return this.model._id;
  }
  public get type() {
    return this.model.type;
  }
  private _title: string;
  public get title() {
    return this._title;
  }
  private _headline: string;
  public get headline() {
    return this._headline;
  }
  private _text: string;
  public get text() {
    return this._text;
  }
  private _image: CloudinaryImage;
  public get image() {
    return this._image;
  }
  private _artworks: Artwork[];
  public get artworks() {
    return this._artworks;
  }

  public get textColor() {
    return this.model.textColor;
  }
  public get customColor() {
    return this.model.customColor;
  }

  public get vimeoLink() {
    return this.model.vimeoLink;
  }

  public get layout() {
    return this.model.layout;
  }

  public translate(language: Language) {
    super.translate(language);

    this._title = this.model.title[language] || this.model.title.english;
    if (this.model.text) {
      this._text = this.model.text[language] || this.model.text.english;
    }
    if (this.model.headline) {
      this._headline = this.model.headline[language] || this.model.headline.english;
    }

    if (
      this.artworks &&
      this.artworks.length &&
      this.artworks[0] instanceof Artwork
    ) {
      this.artworks.forEach((x: Artwork) => x.translate(language));
    }
  }
}

export interface ViewingRoomModel {
  _id: string;
  slug: string;
  title: {
    english: string
    german?: string
    chinese?: string
  };
  thumbnail?: CloudinaryImageModel;
  blocks?: ContentBlockModel[];
}

export class ViewingRoom extends Model {
  constructor(api: ApiService, private model: ViewingRoomModel) {
    super(api);
    if (model.thumbnail) {
      this._thumbnail = new CloudinaryImage(api, model.thumbnail);
    }

    this._blocks =
      model.blocks && model.blocks.length && typeof model.blocks[0] !== 'string'
        ? model.blocks.map(b => new ContentBlock(api, b))
        : [];
  }

  public get id() {
    return this.model._id;
  }
  public get slug() {
    return this.model.slug;
  }
  private _title = '';
  public get title() {
    return this._title;
  }

  private _thumbnail?: CloudinaryImage;
  public get thumbnail() {
    return this._thumbnail;
  }

  public set thumbnail(image: CloudinaryImage) {
    this._thumbnail = image;
  }

  private _blocks?: ContentBlock[];
  public get blocks() {
    return this._blocks;
  }

  public translate(language: Language) {
    this._title = this.model.title[language] || this.model.title.english;
    if (
      this._blocks &&
      this._blocks.length &&
      this._blocks[0] instanceof ContentBlock
    ) {
      this._blocks.forEach(b => b.translate(language));
    }
  }
}

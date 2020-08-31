import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {FrontPageImage} from 'src/app/models/FrontPageImage';
import {CloudinaryImage} from 'src/app/models/CloudinaryImage';
import {
  trigger,
  style,
  animate,
  transition,
  state
} from '@angular/animations';
import {LanguageService} from 'src/app/services/language.service';
import {NavColorService} from 'src/app/services/nav-color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      state('out', style({opacity: 0})),
      transition('in => out', animate('500ms 0ms ease')),
      transition('out => in', animate('500ms 500ms ease')),
      transition('void => in', [style({opacity: 0}), animate('500ms ease')])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService, public lang: LanguageService, public nav: NavColorService) {}
  slides: FrontPageImage[];
  images: CloudinaryImage[] = [];
  imageUrls: string[] = [];
  displacementImage = 'assets/images/displacement/1.jpg';
  activeSlide: FrontPageImage;
  activeIndex = 0;

  loading = true;
  progress: {
    loaded: number;
    total: number;
    ratio: number;
  } = {
      loaded: 0,
      total: 1,
      ratio: 0
    };

  private _dataChangeSubscription;
  private _intervalSubscription;

  color = 'black';

  ngOnInit() {
    this._dataChangeSubscription = this.api.frontPageImages.dataChanged.subscribe(
      () => {
        // this.updateData()
      }
    );
    this.updateData();
    // this._intervalSubscription = interval(8000).subscribe(x => {
    //   this.slides.forEach(s => (s.animationState = "out"));
    //   this.activeIndex = x;
    // });
    this.nav.backgroundColor = 'transparent';
  }

  ngOnDestroy() {
    this._dataChangeSubscription.unsubscribe();
    // this._intervalSubscription.unsubscribe();
    this.nav.backgroundColor = 'white';
  }

  async updateData() {
    this.loading = true;
    await this.api.frontPageImages.waitForData();
    this.slides = [...this.api.frontPageImages.data];
    this.slides.forEach(x => (x.animationState = 'out'));
    this.images = this.slides.map(x => x.image);
    this.imageUrls = this.images.map(x => {
      return x.url;
    });
    // this.loading = false
  }

  slideChanged(event: any) {
    // console.log(
    //   'slide changed:\n  index: ',
    //   event.index,
    //   '\n  image: ',
    //   this.slides[event.index].image.id,
    //   '\n slide title: ',
    //   this.slides[event.index].title
    // )
    this.slides.forEach(s => (s.animationState = 'out'));
    this.activeIndex = event.index;
    this.activeSlide = this.slides[event.index];
    this.activeSlide.animationState = 'in';
    const color =
      this.activeSlide.textColor === 'bright'
        ? 'white'
        : this.activeSlide.textColor === 'dark'
          ? 'black'
          : this.activeSlide.customColor;
    console.log(this.activeSlide, color);
    this.color = color;
    this.nav.textColor = this.color;
    /* this.nav.backgroundColor = this.activeSlide.navColor || 'transparent'; */
  }

  classesFor(slide: FrontPageImage) {
    const res: any = {};
    res[slide.textPlacement] = true;
    res[slide.textColor] = true;
    return res;
  }

  slideshowContentRendered(event: any) {
    // console.log('slideshow content rendered', event)
  }

  slideshowLoadingProgress(event: any) {
    // console.log('slideshow loading progress', event)
    this.progress.ratio = event.ratio;
    if (event.ratio >= 1) {
      setTimeout(() => (this.loading = false), 800);
    }
  }
}

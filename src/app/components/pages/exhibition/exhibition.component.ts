import {Component, OnInit, OnDestroy} from '@angular/core';
import {Exhibition} from 'src/app/models/Exhibition';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {CloudinaryImage} from 'src/app/models';
import {DomSanitizer} from '@angular/platform-browser';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.less'],
})
export class ExhibitionComponent implements OnInit, OnDestroy {

  get loading() {
    return this.mLoading;
  }
  get exhibition() {
    return this.mExibition;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    public lang: LanguageService
  ) {}

  get coverFilter() {
    const filter = `grayscale(${this.coverGreyscale}%) brightness(${
      this.coverBrightness
      }%)`;
    // console.log('filter', filter)
    return this.sanitizer.bypassSecurityTrustStyle(filter);
  }
  private mExibition: Exhibition;
  private mSlug: string;
  private mDataChangeSubscription: any;
  private mLoading = true;

  exhibitionTitle = '';

  coverGreyscale = 0;
  coverBrightness = 100;
  coverStick: any;

  textViewportState = 1;

  showArtworksMasonry = false;

  showPicturesMasonry = false;

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.mSlug = data.get('slug');
      this.mDataChangeSubscription = this.api.exhibitions.dataChanged.subscribe(
        () => {
          this.updateData();
        }
      );
      this.updateData();
    }, console.error);
  }

  ngOnDestroy() {
    this.mDataChangeSubscription.unsubscribe();
  }

  async updateData() {
    this.mLoading = true;
    await this.api.exhibitions.waitForData();
    setTimeout(() => {
      const exhibition = this.api.exhibitions.data.find(
        x => x.slug === this.mSlug
      );
      if (!exhibition) {
        return this.router.navigate(['/page-not-found']);
      }
      this.mExibition = exhibition;
      this.exhibitionTitle = exhibition.title || '';
      this.mLoading = false;
    }, 300);
  }

  inViewportChange(image: CloudinaryImage, event: number) {
    // console.log('in viewport change')
    image.animationState = event;
  }
  onScrolled(event: any) {
    this.coverStick = event > 242;
    if (this.coverStick) {
      this.coverGreyscale = (100 * (event - 242)) / window.innerHeight;
      this.coverBrightness = 100 - 0.0 * this.coverGreyscale;
    }
  }
  artworksMasonryViewportChange(event: any) {
    if (event === 0) {
      this.showArtworksMasonry = true;
    }
  }
  picturesMasonryViewportChange(event: any) {
    if (event === 0) {
      this.showArtworksMasonry = true;
    }
  }

  textViewportChange(event: any) {
    this.textViewportState = event;
    // if (event === 0) this.showPicturesMasonry = true
  }
}

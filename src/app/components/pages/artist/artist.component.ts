import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {
  delay,
  map,
  switchMap,
  tap,
  share,
  filter,
  delayWhen
} from 'rxjs/operators';

import {ApiService} from 'src/app/services/api.service';
import {
  Artist,
  Exhibition,
  CloudinaryImage,
  Artwork,
  ArtworkSeries
} from 'src/app/models';
import {ScrollpaneComponent} from 'src/app/components/layout/scrollpane/scrollpane.component';
import {ImageSize} from 'src/app/components/common/smart-image/smart-image.component';
import {LanguageService} from 'src/app/services/language.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ScrollpaneSectionComponent} from '../../layout/scrollpane-section/scrollpane-section.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist-plain.component.html',
  styleUrls: ['./artist.component.less']
})
export class ArtistComponent implements OnInit, OnDestroy {

  get loading() {
    const s = this.loadingState;
    return !(s.series && s.exhibitions && s.backgroundImages);
  }

  get currentBackgroundIndex() {
    return this._currentBackgroundIndex;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public lang: LanguageService,
    private sanitizer: DomSanitizer
  ) {
  }

  private _currentBackgroundIndex = -1;

  loadingState = {
    series: false,
    exhibitions: false,
    backgroundImages: false
  };
  loadingProgess$: Subject<{
    series: boolean;
    exhibitions: boolean;
    backgroundImages: boolean;
  }> = new Subject();
  loaded$: Observable<any>;
  artist$: Observable<Artist>;
  artist: Artist;
  biography$: Observable<string>;
  artistName$: Observable<string>;
  exhibitions$: Observable<Exhibition[]>;
  hasExhibitions$: Observable<boolean>;
  series$: Observable<ArtworkSeries[]>;
  seriesDelayed$: Observable<ArtworkSeries[]>;
  backgroundImages$: Observable<CloudinaryImage[]>;
  cvUploadHref$: Observable<SafeUrl>;
  hasSeries = true;
  hasCvUpload = false;

  progress: any = {
    ratio: 0,
    done: false
  };

  @ViewChild(ScrollpaneComponent) scrollpane: ScrollpaneComponent;

  textViewportState = 1;

  tabbarHidden = true;
  arrowHidden = true;

  backgroundImageSize: ImageSize = ImageSize.FULLSCREEN;

  @ViewChild('worksSection') worksSection: ScrollpaneSectionComponent;
  @ViewChild('cvSection') cvSection: ScrollpaneSectionComponent;
  @ViewChild('exhibitionsSection')
  exhibitionsSection: ScrollpaneSectionComponent;

  ngOnInit() {
    this.artist$ = this.route.paramMap.pipe(
      delay(5),
      map(data => data.get('slug')),
      switchMap(slug => this.api.artist.withArgs(slug)),
      tap(x => {
        if (!x) {
          return this.router.navigate(['/page-not-found']);
        }
      }),
      map(artists => artists[0]),
      tap(artist => (this.artist = artist)),
      share()
    );

    this.lang.languageChanged.subscribe(_ => {
      this.ngOnInit();
    });

    this.artistName$ = this.artist$.pipe(
      map(artist =>
        artist && artist.name ? artist.name.first + ' ' + artist.name.last : ''
      )
    );

    this.biography$ = this.artist$.pipe(map(artist => artist.biography));

    this.series$ = this.artist$.pipe(
      switchMap(artist => this.api.artworkSeries.withArgs(artist.id)),
      tap(xs => {
        console.log('series evaluated', xs);
        this.loadingState.series = true;
        this.hasSeries = xs && xs.length > 1;
        this.loadingProgess$.next(this.loadingState);
      }),
      share()
    );

    this.cvUploadHref$ = this.artist$.pipe(
      tap(x => console.log('upload', x.cvUpload)),
      filter(x => x.cvUpload !== undefined),
      map(x => x.cvUpload),
      tap(_ => (this.hasCvUpload = true)),
      map(x =>
        this.sanitizer.bypassSecurityTrustUrl(
          `https://hua-international.com/api/upload/${x.filename}`
        )
      )
    );

    this.seriesDelayed$ = this.series$.pipe(delayWhen(_ => this.loaded$));

    this.backgroundImages$ = this.series$.pipe(
      map(series => series.map(s => (s.selectedWork as Artwork).image))
    );

    this.exhibitions$ = this.artist$.pipe(
      switchMap(artist => this.api.exhibitions.withArgs(artist.id)),
      tap(_ => {
        console.log('exhibitions evaluated');
        this.loadingState.exhibitions = true;
        this.loadingProgess$.next(this.loadingState);
      }),
      share()
    );

    this.hasExhibitions$ = this.exhibitions$.pipe(
      map(xs => xs.length && xs.length > 0)
    );

    this.loaded$ = this.loadingProgess$.pipe(
      filter(x => x.series && x.backgroundImages && x.exhibitions),
      tap(_ => console.log('loaded!'))
    );
    this.loadingProgess$.subscribe(console.log, console.error);
  }

  ngOnDestroy() {}

  inViewportChange(image: CloudinaryImage | Artwork, event: number) {
    image.animationState = event;
  }

  sectionActiveChange(
    series?: ArtworkSeries,
    active?: boolean,
    index?: number,
    top?: boolean
  ) {
    if (top) {
      // console.log('top')
      this.tabbarHidden = active;
    }
    if (!active) {
      return;
    }
    if (!series) {
      this._currentBackgroundIndex = -1;
    } else {
      // console.log('change background: ', series.title, index)
      this._currentBackgroundIndex = index;
      setTimeout(() => {
        series.animationState = true;
      }, 300);
    }
  }
  backgroundLoadingProgress($event: any) {
    console.log('background loading progress', $event.ratio);
    this.progress = $event;

    if (this.progress.ratio >= 1) {
      setTimeout(() => {
        this.progress.done = true;
        this.loadingState.backgroundImages = true;
        this.loadingProgess$.next(this.loadingState);
      }, 600);
    }
  }

  downArrowClicked() {
    const sections = this.scrollpane.sections.toArray();
    const index = sections.findIndex(s => s.active);
    if (index + 1 < sections.length) {
      this.scrollpane.scrollToSection(
        this.scrollpane.sections.toArray()[index + 1],
        800
      );
    }
    this.showArrow(false);
  }

  showArrow(event: any) {
    // console.log('show arrow ', event)
    this.arrowHidden = !event;
  }

  scrollToSeries(s: ArtworkSeries) {
    const section = this.scrollpane.sections.find(x => x.snippet === s.title);
    this.scrollpane.scrollToSection(section);
  }

  isSeriesActive(s: ArtworkSeries) {
    const section = this.scrollpane.sections.find(x => x.snippet === s.title);
    return section && section.active;
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import {
  Artist,
  Exhibition,
  CloudinaryImage,
  Artwork,
  ArtworkSeries,
} from 'src/app/models'
import { Observable, of } from 'rxjs'

import { ScrollpaneComponent } from 'src/app/components/layout/scrollpane/scrollpane.component'
import { ImageSize } from 'src/app/components/common/smart-image/smart-image.component'

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.less'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  private _artist: Artist
  private _slug: string
  private _dataChangeSubscription

  private _exhibitions: Observable<Exhibition[]> = of([])
  private _artworks: Observable<Artwork[]> = of([])
  private _series: Observable<ArtworkSeries[]> = of([])
  private _backgroundImages: CloudinaryImage[] = []
  private _currentBackgroundIndex: number = -1

  loading = true
  // showSeries = false

  get artist() {
    return this._artist
  }
  get exhibitions() {
    return this._exhibitions
  }
  get artworks() {
    return this._artworks
  }
  get series() {
    return this._series
  }
  get backgroundImages() {
    return this._backgroundImages
  }
  get currentBackgroundIndex() {
    return this._currentBackgroundIndex
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      data => {
        let slug = data.get('slug')
        this._slug = slug
        this._dataChangeSubscription = this.api.artists.dataChanged.subscribe(
          () => {
            this.updateData()
          }
        )
        this.updateData()
      },
      error => console.error(error)
    )
  }

  ngOnDestroy() {
    this._dataChangeSubscription.unsubscribe()
  }

  async updateData() {
    this.loading = true
    // this.showSeries = false
    await this.api.artists.waitForData()
    let artist = this.api.artists.data.find(x => x.slug === this._slug)
    if (!artist) {
      return this.router.navigate(['/page-not-found'])
    }
    this._artist = artist

    this._series = this.api.artworkSeries.withArgs(this.artist.id)
    // .pipe(
    //   timed(800)
    // )
    this._exhibitions = this.api.exhibitions.withArgs(this.artist.id)
    this._artworks = this.api.artworks.withArgs(this.artist.id)

    let loaded = [false, false, false]
    let loadingFinished = () => {
      if (loaded[0] && loaded[1] && loaded[2]) {
        console.log('all loaded')
        this.loading = false
        // setTimeout(_ => {
        //   this.showSeries = true
        // }, 1200)
      }
    }

    this._series.subscribe((data: ArtworkSeries[]) => {
      loaded[0] = true
      this._backgroundImages = data.map(x => (x.selectedWork as Artwork).image)
      loadingFinished()
    })
    this._exhibitions.subscribe(() => {
      loaded[1] = true
      loadingFinished()
    })
    this._artworks.subscribe(() => {
      loaded[2] = true
      loadingFinished()
    })
    ;(window as any).artist = this
  }

  artistName() {
    return this.artist && this.artist.name
      ? this.artist.name.first + ' ' + this.artist.name.last
      : ''
  }

  inViewportChange(image: CloudinaryImage | Artwork, event: number) {
    image.animationState = event
  }

  backgroundSlideChanged(event) {
    // console.log('background slide changed: ', event)
  }

  sectionActiveChange(
    series?: ArtworkSeries,
    active?: boolean,
    index?: number,
    top?: boolean
  ) {
    if (top) {
      // console.log('top')
      this.tabbarHidden = active
    }
    if (!active) return
    if (!series) {
      this._currentBackgroundIndex = -1
    } else {
      // console.log('change background: ', series.title, index)
      this._currentBackgroundIndex = index
      setTimeout(() => {
        series.animationState = true
      }, 300)
    }
  }

  progress: any = {
    ratio: 0,
    done: false,
  }
  backgroundLoadingProgress($event) {
    // console.log('background loading progress', $event.ratio)
    this.progress = $event

    if (this.progress.ratio >= 1) {
      setTimeout(() => {
        this.progress.done = true
      }, 600)
    }
  }

  @ViewChild(ScrollpaneComponent) scrollpane: ScrollpaneComponent

  downArrowClicked() {
    let sections = this.scrollpane.sections.toArray()
    let index = sections.findIndex(s => s.active)
    if (index + 1 < sections.length) {
      this.scrollpane.scrollToSection(
        this.scrollpane.sections.toArray()[index + 1],
        800
      )
    }
    this.showArrow(false)
  }

  textViewportState = 1

  tabbarHidden = true
  arrowHidden = true

  showArrow(event) {
    // console.log('show arrow ', event)
    this.arrowHidden = !event
  }

  backgroundImageSize: ImageSize = ImageSize.FULLSCREEN
}

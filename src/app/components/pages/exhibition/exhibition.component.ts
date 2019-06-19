import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exhibition } from 'src/app/models/Exhibition';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CloudinaryImage } from 'src/app/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-exhibition',
  templateUrl: './exhibition.component.html',
  styleUrls: ['./exhibition.component.less']
})
export class ExhibitionComponent implements OnInit, OnDestroy {

  private _exhibition: Exhibition
  private _slug: string
  private _dataChangeSubscription
  private _loading: boolean = true

  get loading() { return this._loading }
  get exhibition() { return this._exhibition }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      data => {
        this._slug = data.get('slug')
        this._dataChangeSubscription = this.api.exhibitions.dataChanged.subscribe(() => {
          this.updateData()
        })
        this.updateData()
      },
      console.error
    )
  }

  ngOnDestroy() {
    this._dataChangeSubscription.unsubscribe()
  }

  async updateData() {
    this._loading = true
    await this.api.exhibitions.waitForData()
    setTimeout(() => {
      let exhibition = this.api.exhibitions.data.find(x => x.slug === this._slug)
      if (!exhibition) {
        return this.router.navigate['/page-not-found']
      }
      this._exhibition = exhibition
      this.exhibitionTitle = exhibition.title || ''
      this._loading = false
    }, 300)
  }

  exhibitionTitle = ''

  inViewportChange(image:CloudinaryImage, event: number) {
    // console.log('in viewport change')
    image.animationState = event
  }

  coverGreyscale = 0
  coverBrightness = 100
  coverStick
  onScrolled(event) {
    this.coverStick = event > 242
    if (this.coverStick) {
      this.coverGreyscale = 100 * (event - 242) / window.innerHeight
      this.coverBrightness = 100 - 0.0 * this.coverGreyscale
    }
  }


  get coverFilter() {
    let filter = `grayscale(${this.coverGreyscale}%) brightness(${this.coverBrightness}%)`
    // console.log('filter', filter)
    return this.sanitizer.bypassSecurityTrustStyle(filter)
  }


  textViewportState = 1

  showArtworksMasonry = false
  artworksMasonryViewportChange(event) {
    if (event === 0) this.showArtworksMasonry = true
  }

  showPicturesMasonry = false
  picturesMasonryViewportChange(event) {
    if (event === 0) this.showArtworksMasonry = true
  }

  textViewportChange(event) {
    this.textViewportState = event
    // if (event === 0) this.showPicturesMasonry = true
  }
}

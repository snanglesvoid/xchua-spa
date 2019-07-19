import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'
import { Fair, CloudinaryImage } from 'src/app/models'

@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.less'],
})
export class FairComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  private _fair: Fair
  private _slug: string
  private _dataChangeSubscription
  private _loading: boolean = true

  fairTitle: string = ''

  get loading() {
    return this._loading
  }
  get fair() {
    return this._fair
  }

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this._slug = data.get('slug')
      this._dataChangeSubscription = this.api.fairs.dataChanged.subscribe(_ => {
        this.updateData()
      })
      this.updateData()
    }, console.error)
  }

  ngOnDestroy() {
    this._dataChangeSubscription.unsubscribe()
  }

  async updateData() {
    this._loading = true
    await this.api.fairs.waitForData()
    setTimeout(_ => {
      let fair = this.api.fairs.data.find(x => x.slug === this._slug)
      if (!fair) {
        return this.router.navigate(['/page-not-found'])
      }
      this._fair = fair
      this.fairTitle = fair.title || ''
      this._loading = false
    })
  }

  inViewportChange(image: CloudinaryImage, event: number) {
    image.animationState = event
  }

  textViewportState = 1
  textViewportChange(event) {
    this.textViewportState = event
    // if (event === 0) this.showPicturesMasonry = true
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { GallerySpace } from 'src/app/models/GallerySpace'
import { Router } from '@angular/router'
import { SnippetService } from 'src/app/services/snippet.service'
import { from } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
})
export class AboutComponent implements OnInit, OnDestroy {
  private dataChangeSubscription
  loading: boolean = true

  gallerySpaces: GallerySpace[] = []

  statements$ = from(this.snippet.getTextblock('abouttext')).pipe(
    tap(console.log),
    map(x => x.content)
  )

  constructor(
    private api: ApiService,
    private router: Router,
    private snippet: SnippetService
  ) {}

  ngOnInit() {
    this.dataChangeSubscription = this.api.gallerySpaces.dataChanged.subscribe(
      () => {
        this.updateData()
      }
    )
    this.updateData()
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe()
  }

  async updateData() {
    try {
      this.loading = true
      await this.api.gallerySpaces.waitForData()
      this.gallerySpaces = this.api.gallerySpaces.data
      // console.log(this.gallerySpaces)
    } catch (error) {
      this.router.navigate(['/server-error'], { state: { error: error } })
    } finally {
      this.loading = false
    }
  }

  galleryClicked(gallery: GallerySpace) {
    // console.log('gallery click')
    if (!gallery.animationState) {
      // gallery.animationState = true
      // this.other(gallery).animationState = false
    }
  }
}

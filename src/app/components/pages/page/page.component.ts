import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SnippetService } from 'src/app/services/snippet.service'
import { Textblock } from 'src/app/models'
import { LanguageService } from 'src/app/services/language.service'
import { trigger, animate, transition, style } from '@angular/animations'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PageComponent implements OnInit, OnDestroy {
  private _slug: string
  public get slug() {
    return this._slug || ''
  }
  loading = true
  writing = true
  data: Textblock
  private dataChangeSubscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snippet: SnippetService,
    private language: LanguageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      let slug = data.get('slug')
      if (!slug) {
        return this.router.navigate(['/page-not-found'])
      }
      this._slug = slug
      this.updateData()
      this.dataChangeSubscription = this.language.languageChanged.subscribe(
        () => {
          this.updateData()
        }
      )
    }, console.error)
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe()
  }

  async updateData() {
    this.loading = true
    try {
      this.data = await this.snippet.getTextblock(this.slug)
    } catch (error) {
      this.router.navigate(['/server-error'], { state: { error: error } })
    } finally {
      this.loading = false
    }
  }
}

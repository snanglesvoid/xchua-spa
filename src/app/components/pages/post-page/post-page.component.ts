import {Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from 'src/app/models/Post';
import {ApiService} from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less']
})
export class PostPageComponent implements OnInit, OnDestroy {
  private mDataChangeSubscription: any;
  private slug: string;
  post: Post;
  loading = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public lang: LanguageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.slug = data.get('slug');
      this.mDataChangeSubscription = this.api.news.dataChanged.subscribe(() => {
        this.updateData();
      });
      this.updateData();
    }, console.error);
  }

  ngOnDestroy() {
    this.mDataChangeSubscription.unsubscribe();
  }

  async updateData() {
    this.loading = true;
    await this.api.news.waitForData();
    this.post = this.api.news.data.find(x => x.slug === this.slug);
    if (!this.post) {
      return this.router.navigate(['/page-not-found']);
    }
    this.loading = false;
  }

  postTitle() {
    return this.post ? this.post.title : '';
  }
}

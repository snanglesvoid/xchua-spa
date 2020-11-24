import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {Fair, CloudinaryImage} from 'src/app/models';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-fair',
  templateUrl: './fair.component.html',
  styleUrls: ['./fair.component.less'],
})
export class FairComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public lang: LanguageService
  ) {}

  get loading() {
    return this.mLoading;
  }
  get fair() {
    return this.mFair;
  }

  private mFair: Fair;
  private mSlug: string;
  private mDataChangeSubscription: any;
  private mLoading = true;

  fairTitle = '';

  textViewportState = 1;

  ngOnInit() {
    this.route.paramMap.subscribe(data => {
      this.mSlug = data.get('slug');
      this.mDataChangeSubscription = this.api.fairs.dataChanged.subscribe((_: any) => {
        this.updateData();
      });
      this.updateData();
    }, console.error);
  }

  ngOnDestroy() {
    this.mDataChangeSubscription.unsubscribe();
  }

  async updateData() {
    this.mLoading = true;
    await this.api.fairs.waitForData();
    setTimeout((_: any) => {
      const fair = this.api.fairs.data.find(x => x.slug === this.mSlug);
      if (!fair) {
        return this.router.navigate(['/page-not-found']);
      }
      this.mFair = fair;
      this.fairTitle = fair.title || '';
      this.mLoading = false;
    });
  }

  inViewportChange(image: CloudinaryImage, event: number) {
    image.animationState = event;
  }
  textViewportChange(event: any) {
    this.textViewportState = event;
    // if (event === 0) this.showPicturesMasonry = true
  }
}

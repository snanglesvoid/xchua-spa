import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {ViewingRoom, ContentBlock} from 'src/app/models/ViewingRoom';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {LanguageService} from 'src/app/services/language.service';
import {switchMap, map, tap, delay, share} from 'rxjs/operators';
import {NavColorService} from 'src/app/services/nav-color.service';
import {CookieService} from 'ngx-cookie-service';
import {InquireService} from 'src/app/services/inquire.service';

@Component({
  selector: 'app-viewing-room',
  templateUrl: './viewing-room.component.html',
  styleUrls: ['./viewing-room.component.less']
})
export class ViewingRoomComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private navC: NavColorService,
    private cookie: CookieService,
    public lang: LanguageService,
    public inquire: InquireService
  ) {}

  public viewingRoom$: Observable<ViewingRoom>;
  public blocks$: Observable<ContentBlock[]>;
  public email = '';
  public name = '';

  activeBlock: ContentBlock;

  ngOnInit() {
    this.navC.hidden = true;
    this.viewingRoom$ = this.route.paramMap.pipe(
      delay(5),
      map(data => data.get('slug')),
      switchMap((slug: string) => this.api.viewingRoom.withArgs(slug)),
      tap(x => {
        if (!x || x.length === 0) {
          return this.router.navigate(['/page-not-found']);
        }
      }),
      map(vrs => vrs[0]),
      share(),
    );

    this.blocks$ = this.viewingRoom$.pipe(
      map(x => x.blocks),
      tap(console.log)
    );

    if (this.cookie.get('email')) {
      this.email = this.cookie.get('email');
    }

    if (this.cookie.get('name')) {
      this.name = this.cookie.get('name');
    }
  }

  ngOnDestroy() {
    this.navC.hidden = false;
  }

  blockInViewport(event: any, block: ContentBlock) {
    if (event !== 0) {
      return;
    }
    this.activeBlock = block;

    console.log(this.activeBlock);
    if (block.type === 'Title Image') {
      this.navC.textColor =
        block.textColor === 'bright'
          ? 'white'
          : block.textColor === 'dark'
            ? 'black'
            : block.customColor || 'black';

    } else {
      this.navC.textColor = 'black';
    }
    console.log(this.navC.textColor);
  }

  public get detailsKnown() {
    return true;
    return this.email !== '' && this.name;
  }

  emailRegistered($event: any) {
    this.email = $event.email;
    this.name = $event.name;
    this.cookie.set('email', this.email, 365, '/', 'hua-international.com', true);
    this.cookie.set('name', this.name, 365, '/', 'hua-international.com', true);
  }
}

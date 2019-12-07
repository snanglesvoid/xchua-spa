import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { GallerySpace } from "src/app/models/GallerySpace";
import { Router } from "@angular/router";
import { SnippetService } from "src/app/services/snippet.service";
import { from, fromEvent, Observable, merge, of } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";
import { ClientService } from "src/app/services/client.service";
import { LanguageService } from "src/app/services/language.service";
import { ScrollpaneComponent } from "../../layout/scrollpane/scrollpane.component";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.less"]
})
export class AboutComponent implements OnInit, OnDestroy {
  private dataChangeSubscription;
  loading: boolean = true;

  gallerySpaces: GallerySpace[] = [];
  statements$: Observable<string>;

  // from(this.snippet.getTextblock('abouttext')).pipe(
  //   tap(console.log),
  //   map(x => x.content)
  // )

  constructor(
    private api: ApiService,
    private router: Router,
    private snippet: SnippetService,
    private client: ClientService,
    private lang: LanguageService
  ) {}

  ngOnInit() {
    this.dataChangeSubscription = this.api.gallerySpaces.dataChanged.subscribe(
      () => {
        this.updateData();
      }
    );
    this.updateData();

    this.statements$ = merge(this.lang.languageChanged, of(1)).pipe(
      switchMap(_ => from(this.snippet.getTextblock("abouttext"))),
      tap(console.log),
      map(x => x.content)
    );
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe();
  }

  get isMobile() {
    return this.client.isMobile || this.client.isTablet;
  }

  async updateData() {
    try {
      this.loading = true;
      await this.api.gallerySpaces.waitForData();
      this.gallerySpaces = this.api.gallerySpaces.data;
      // console.log(this.gallerySpaces)
    } catch (error) {
      this.router.navigate(["/server-error"], { state: { error: error } });
    } finally {
      this.loading = false;
    }
  }

  galleryClicked(gallery: GallerySpace) {
    // console.log('gallery click')
    if (!gallery.animationState) {
      // gallery.animationState = true
      // this.other(gallery).animationState = false
    }
  }

  @ViewChild("pictures") pictures: ElementRef<HTMLDivElement>;
  @ViewChild(ScrollpaneComponent) scrollpane;

  activeIndex = 0;
  scrollLeft() {
    console.log("scrollLeft");
    this.activeIndex = 0;
  }
  scrollRight() {
    console.log("scrollRight");
    this.activeIndex = 1;
  }
}

import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NgModule, Injectable} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CloudinaryModule} from "@cloudinary/angular-5.x";
import {Cloudinary} from "cloudinary-core/cloudinary-core-shrinkwrap";
import {DeviceDetectorModule} from "ngx-device-detector";
import {CookieService} from "ngx-cookie-service";
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig
} from "ngx-cookieconsent";

import {AppComponent} from "./app.component";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {NavComponent} from "./components/nav/nav.component";
import {LogoComponent} from "./components/logo/logo.component";
import {SociallinksComponent} from "./components/sociallinks/sociallinks.component";
import {ScrollpaneComponent} from "./components/layout/scrollpane/scrollpane.component";
import {ScrollpaneSectionComponent} from "./components/layout/scrollpane-section/scrollpane-section.component";
import {NavlinkComponent} from "./components/nav/navlink/navlink.component";
import {LanguageSelectComponent} from "./components/nav/language-select/language-select.component";
import {NavToggleComponent} from "./components/nav/nav-toggle/nav-toggle.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {ArtistsComponent} from "./components/pages/artists/artists.component";
import {ArtistComponent} from "./components/pages/artist/artist.component";
import {ExhibitionsComponent} from "./components/pages/exhibitions/exhibitions.component";
import {ExhibitionComponent} from "./components/pages/exhibition/exhibition.component";
import {AboutComponent} from "./components/pages/about/about.component";
import {ContactComponent} from "./components/pages/contact/contact.component";
import {ContactFormComponent} from "./components/forms/contact-form/contact-form.component";
import {SubscribeFormComponent} from "./components/forms/subscribe-form/subscribe-form.component";
import {FairsComponent} from "./components/pages/fairs/fairs.component";
import {LibaryComponent} from "./components/pages/libary/libary.component";
import {PageComponent} from "./components/pages/page/page.component";
import {SubscribeComponent} from "./components/pages/subscribe/subscribe.component";
import {NewsComponent} from "./components/pages/news/news.component";
import {SnippetComponent} from "./components/common/snippet/snippet.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {PageHeaderComponent} from "./components/layout/page-header/page-header.component";
import {TabbarComponent} from "./components/layout/tabbar/tabbar.component";
import {PageBodyComponent} from "./components/layout/page-body/page-body.component";
import {LoremIpsumComponent} from "./components/lorem-ipsum/lorem-ipsum.component";
import {SnippetService} from "./services/snippet.service";
import {SvgCanvasService} from "./services/svg-canvas.service";
import {SlideshowComponent} from "./components/common/slideshow/slideshow.component";
import {TypewriterComponent} from "./components/common/typewriter/typewriter.component";
import {PostComponent} from "./components/pages/news/post/post.component";
import {GallerySpaceComponent} from "./components/pages/about/gallery-space/gallery-space.component";
import {PostPageComponent} from "./components/pages/post-page/post-page.component";
import {ExhibitionsListComponent} from "./components/pages/exhibitions/exhibitions-list/exhibitions-list.component";
import {ExhibitionsListItemComponent} from "./components/pages/exhibitions/exhibitions-list-item/exhibitions-list-item.component";
import {ExDateFilterPipe} from "./pipes/ex-date-filter.pipe";
import {ExLocationFilterPipe} from "./pipes/ex-location-filter.pipe";
import {WechatComponent} from "./components/pages/wechat/wechat.component";
import {ParallaxComponent} from "./components/common/parallax/parallax.component";
import {ScrollToDirective} from "./directives/scroll-to.directive";

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import {SmartImageComponent} from "./components/common/smart-image/smart-image.component";
import {MasonryComponent} from "./components/common/masonry/masonry.component";
import {ImagesLoadedDirective} from "./directives/images-loaded.directive";
import {MasonryItemComponent} from "./components/common/masonry/masonry-item/masonry-item.component";
import {HtmlBlockComponent} from "./components/common/html-block/html-block.component";
import {RippleButtonComponent} from "./components/buttons/ripple-button/ripple-button.component";
import {SnippetPipe} from "./pipes/snippet.pipe";
import {ModalImagesDirective} from "./directives/modal-images.directive";
import {ModalImagesComponent} from "./components/modal-images/modal-images.component";
import {ArtworkComponent} from "./components/common/artwork/artwork.component";
// import { CaptionDirective } from './directives/caption.directive'
import {SlideshowControllerComponent} from "./components/common/slideshow-controller/slideshow-controller.component";
import {ArtworkSeriesComponent} from "./components/pages/artist/artwork-series/artwork-series.component";
import {ProgressBarComponent} from "./components/common/progress-bar/progress-bar.component";
import {FooterComponent} from "./components/common/footer/footer.component";
import {FairComponent} from "./components/pages/fair/fair.component";
import {FairDateFilterPipe} from "./pipes/fair-date-filter.pipe";
import {DateRangePipe} from "./pipes/date-range.pipe";
import {GlShelfComponent} from "./components/gl/gl-shelf/gl-shelf.component";
import {XcDatePipe} from "./pipes/xc-date.pipe";
import {FairCardComponent} from "./components/pages/fairs/fair-card/fair-card.component";
import {SlideshowCursorControllerComponent} from "./components/common/slideshow-cursor-controller/slideshow-cursor-controller.component";
import {SlideshowSimpleComponent} from "./components/common/slideshow-simple/slideshow-simple.component";

@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: "auto"
    });
    return mc;
  }
}

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
    data: {animation: "HomePage"}
  },
  {
    path: "artists",
    component: ArtistsComponent,
    data: {animation: "ArtistsPage"}
  },
  {
    path: "artists/:slug",
    component: ArtistComponent,
    data: {animation: "ArtistPage"}
  },
  {
    path: "exhibitions",
    component: ExhibitionsComponent,
    data: {animation: "ExhibitionsPage"}
  },
  {
    path: "exhibitions/:slug",
    component: ExhibitionComponent,
    data: {animation: "ExhibitionPage"}
  },
  {
    path: "about",
    component: AboutComponent,
    data: {animation: "AboutPage"}
  },
  {
    path: "contact",
    component: ContactComponent,
    data: {animation: "ContactPage"}
  },
  {
    path: "subscribe",
    component: SubscribeComponent,
    data: {animation: "SubscribePage"}
  },
  {
    path: "fairs",
    component: FairsComponent,
    data: {animation: "FairsPage"}
  },
  {
    path: "fairs/:slug",
    component: FairComponent,
    data: {animation: "FairPage"}
  },
  {
    path: "libary",
    component: LibaryComponent,
    data: {animation: "LibaryPage"}
  },
  {path: "news", component: NewsComponent, data: {animation: "NewsPage"}},
  {
    path: "posts/:slug",
    component: PostPageComponent,
    data: {animation: "PostPage"}
  },
  {
    path: "pages/wechat",
    component: WechatComponent,
    data: {animation: "WechatPage"}
  },
  {
    path: "pages/:slug",
    component: PageComponent,
    data: {animation: "Page"}
  },
  {path: "**", component: PageNotFoundComponent}
];

let cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: "hua-international.com"
  },
  position: "bottom",
  theme: "block",
  palette: {
    popup: {
      background: "#ffffff",
      text: "#373334",
      link: "#424242"
    },
    button: {
      background: "#ffffff",
      text: "#373334",
      border: "1px solid #424242"
    }
  },
  type: "info",
  content: {
    message:
      "This website uses cookies to ensure you get the best experience on our website.",
    dismiss: "Got it!",
    deny: "Refuse cookies",
    link: "Learn more",
    href: "https://cookiesandyou.com",
    policy: "Cookie Policy"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NavComponent,
    LogoComponent,
    SociallinksComponent,
    ScrollpaneComponent,
    ScrollpaneSectionComponent,
    NavlinkComponent,
    LanguageSelectComponent,
    NavToggleComponent,
    HomeComponent,
    ArtistsComponent,
    ArtistComponent,
    ExhibitionsComponent,
    ExhibitionComponent,
    AboutComponent,
    ContactComponent,
    ContactFormComponent,
    SubscribeFormComponent,
    FairsComponent,
    FairComponent,
    LibaryComponent,
    PageComponent,
    SubscribeComponent,
    NewsComponent,
    SnippetComponent,
    PageNotFoundComponent,
    PageHeaderComponent,
    TabbarComponent,
    PageBodyComponent,
    LoremIpsumComponent,
    SlideshowComponent,
    TypewriterComponent,
    PostComponent,
    GallerySpaceComponent,
    PostPageComponent,
    ExhibitionsListComponent,
    ExhibitionsListItemComponent,
    ExDateFilterPipe,
    ExLocationFilterPipe,
    WechatComponent,
    ParallaxComponent,
    ScrollToDirective,
    SmartImageComponent,
    MasonryComponent,
    ImagesLoadedDirective,
    MasonryItemComponent,
    HtmlBlockComponent,
    RippleButtonComponent,
    SnippetPipe,
    ModalImagesDirective,
    ModalImagesComponent,
    ArtworkComponent,
    // CaptionDirective,
    SlideshowControllerComponent,
    ArtworkSeriesComponent,
    ProgressBarComponent,
    FooterComponent,
    FairDateFilterPipe,
    DateRangePipe,
    GlShelfComponent,
    XcDatePipe,
    FairCardComponent,
    SlideshowCursorControllerComponent,
    SlideshowSimpleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot(
      {Cloudinary: Cloudinary},
      {
        cloud_name: "xc-hua"
      }
    ),
    DeviceDetectorModule.forRoot(),
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    SnippetService,
    CookieService,
    SvgCanvasService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AppHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

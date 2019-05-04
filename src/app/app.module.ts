import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavComponent } from './components/nav/nav.component';
import { LogoComponent } from './components/logo/logo.component';
import { SociallinksComponent } from './components/sociallinks/sociallinks.component';
import { ScrollpaneComponent } from './components/layout/scrollpane/scrollpane.component';
import { ScrollpaneSectionComponent } from './components/layout/scrollpane-section/scrollpane-section.component';
import { NavlinkComponent } from './components/nav/navlink/navlink.component';
import { LanguageSelectComponent } from './components/nav/language-select/language-select.component';
import { NavToggleComponent } from './components/nav/nav-toggle/nav-toggle.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ArtistsComponent } from './components/pages/artists/artists.component';
import { ArtistComponent } from './components/pages/artist/artist.component';
import { ExhibitionsComponent } from './components/pages/exhibitions/exhibitions.component';
import { ExhibitionComponent } from './components/pages/exhibition/exhibition.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { SubscribeFormComponent } from './components/forms/subscribe-form/subscribe-form.component';
import { FairsComponent } from './components/pages/fairs/fairs.component';
import { LibaryComponent } from './components/pages/libary/libary.component';
import { PageComponent } from './components/pages/page/page.component';
import { SubscribeComponent } from './components/pages/subscribe/subscribe.component';
import { NewsComponent } from './components/pages/news/news.component';
import { SnippetComponent } from './components/common/snippet/snippet.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { PageHeaderComponent } from './components/layout/page-header/page-header.component';
import { TabbarComponent } from './components/layout/tabbar/tabbar.component';
import { PageBodyComponent } from './components/layout/page-body/page-body.component';
import { LoremIpsumComponent } from './components/lorem-ipsum/lorem-ipsum.component';
import { ScrollService } from './services/scroll.service';
import { SnippetService } from './services/snippet.service';
import { SvgCanvasService } from './services/svg-canvas.service';


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'artists', component: ArtistsComponent, data: { animation: 'ArtistsPage' } },
  { path: 'artist/:slug', component: ArtistComponent, data: { animation: 'ArtistPage' } },
  { path: 'exhibitions', component: ExhibitionsComponent, data: { animation: 'ExhibitionsPage' } },
  { path: 'exhibition/:slug', component: ExhibitionComponent, data: { animation: 'ExhibitionPage' } },
  { path: 'about', component: AboutComponent, data: { animation: 'AboutPage' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage' } },
  { path: 'subscribe', component: SubscribeComponent, data: { animation: 'SubscribePage' } },
  { path: 'fairs', component: FairsComponent, data: { animation: 'FairsPage' } },
  { path: 'libary', component: LibaryComponent, data: { animation: 'LibaryPage' } },
  { path: 'news', component: NewsComponent, data: { animation: 'NewsPage' } },
  { path: '**', component: PageNotFoundComponent },
]


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
    LibaryComponent,
    PageComponent,
    SubscribeComponent,
    NewsComponent,
    SnippetComponent,
    PageNotFoundComponent,
    PageHeaderComponent,
    TabbarComponent,
    PageBodyComponent,
    LoremIpsumComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: false }
    ),
    HttpClientModule,
    FormsModule,
  ],
  providers: [ScrollService, SnippetService, SvgCanvasService],
  bootstrap: [AppComponent]
})
export class AppModule { }

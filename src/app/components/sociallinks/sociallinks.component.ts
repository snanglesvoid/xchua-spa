import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../environments/environment'
import { SocialLink, SocialLinkModel } from 'src/app/models/SocialLink';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

const apiPrefix = environment.apiPrefix

@Component({
  selector: 'app-sociallinks',
  templateUrl: './sociallinks.component.html',
  styleUrls: ['./sociallinks.component.less']
})
export class SociallinksComponent implements OnInit {

  loading: boolean = true

  sociallinks: SocialLink[]

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) { }

  ngOnInit() {
    this.http.get(apiPrefix + '/sociallinks')
      .subscribe(
        response => {
          this.sociallinks = (response as Array<SocialLinkModel>).map(s => new SocialLink(this.api, s))
          this.loading = false
        },
        error => {
          console.error(error)
        }
      )
  }

  getUrl(link: SocialLink) {
    return this.sanitizer.bypassSecurityTrustUrl(link.url)
  }

  goTo(link: SocialLink) {
    if (link.url.startsWith('/')) {
      this.router.navigate([link.url])
    }
    else {
      window.open(link.url, '_blank')
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import { LanguageService } from '../../../services/language.service'

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.less']
})
export class ArtistsComponent implements OnInit {

  residentArtists: any[] = [
  
  ]
  guestArtists: any[] = [
   
  ]
 
  constructor(
    private api: ApiService,
    private language: LanguageService
  ) { 

  }

  async ngOnInit() {
    await this.api.waitForArtists()
    this.residentArtists = this.api.artists.filter(x => x.artistType === 'resident')
    this.guestArtists = this.api.artists.filter(x => x.artistType === 'guest')
  }

  artistMouseover(artist) {

  }

  artistMouseout(artist) {

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { SnippetService } from 'src/app/services/snippet.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.less']
})
export class SnippetComponent implements OnInit {

  @Input() snippet: string = ''

  text: string = '...'

  constructor(
    private snippetService: SnippetService,
    private languageService: LanguageService,
  ) { 

  }

  async ngOnInit() {
    await this.snippetService.waitForLoad()
    this.text = await this.snippetService.snippetText(this.snippet, this.languageService.language)
  }
}

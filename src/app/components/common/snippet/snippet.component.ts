import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {SnippetService} from 'src/app/services/snippet.service';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.less']
})
export class SnippetComponent implements OnInit, OnDestroy {

  @Input() snippet = '';

  text = '...';

  @Output() finished = new EventEmitter<any>();

  constructor(
    private snippetService: SnippetService,
    private languageService: LanguageService,
  ) {

  }

  private subscription: any;
  async ngOnInit() {
    this.updateData();
    this.subscription = this.languageService.languageChanged.subscribe(() => {
      this.updateData();
    });
  }

  async updateData() {
    await this.snippetService.waitForLoad();
    this.text = await this.snippetService.snippetText(this.snippet, this.languageService.language);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

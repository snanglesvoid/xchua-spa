import {Pipe, PipeTransform} from '@angular/core';
import {SnippetService} from '../services/snippet.service';

@Pipe({
  name: 'snippet'
})
export class SnippetPipe implements PipeTransform {

  constructor(
    private snippetService: SnippetService,
  ) {

  }

  async transform(value: any, args?: any): Promise<string> {
    console.log('snippet pipe transform, value = ', value, 'args = ', args);
    await this.snippetService.waitForLoad();
    try {
      return this.snippetService.snippetText(value as string, args as string);
    } catch (error) {
      return Promise.resolve('...');
    }
  }

}

import { TestBed } from '@angular/core/testing';

import { SnippetService } from './snippet.service';

describe('SnippetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnippetService = TestBed.get(SnippetService);
    expect(service).toBeTruthy();
  });
});

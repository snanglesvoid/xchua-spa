import { TestBed } from '@angular/core/testing';

import { InquireService } from './inquire.service';

describe('InquireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InquireService = TestBed.get(InquireService);
    expect(service).toBeTruthy();
  });
});

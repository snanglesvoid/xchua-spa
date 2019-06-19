import { TestBed } from '@angular/core/testing';

import { EasingFunctionsService } from './easing-functions.service';

describe('EasingFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EasingFunctionsService = TestBed.get(EasingFunctionsService);
    expect(service).toBeTruthy();
  });
});

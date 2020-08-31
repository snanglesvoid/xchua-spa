import { TestBed } from '@angular/core/testing';

import { NavColorService } from './nav-color.service';

describe('NavColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavColorService = TestBed.get(NavColorService);
    expect(service).toBeTruthy();
  });
});

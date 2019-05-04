import { TestBed } from '@angular/core/testing';

import { SvgCanvasService } from './svg-canvas.service';

describe('SvgCanvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgCanvasService = TestBed.get(SvgCanvasService);
    expect(service).toBeTruthy();
  });
});

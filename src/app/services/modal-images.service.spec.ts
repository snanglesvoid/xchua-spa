import { TestBed } from '@angular/core/testing';

import { ModalImagesService } from './modal-images.service';

describe('ModalImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalImagesService = TestBed.get(ModalImagesService);
    expect(service).toBeTruthy();
  });
});

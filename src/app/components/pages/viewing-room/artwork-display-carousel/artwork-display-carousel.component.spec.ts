import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkDisplayCarouselComponent } from './artwork-display-carousel.component';

describe('ArtworkDisplayCarouselComponent', () => {
  let component: ArtworkDisplayCarouselComponent;
  let fixture: ComponentFixture<ArtworkDisplayCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkDisplayCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkDisplayCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

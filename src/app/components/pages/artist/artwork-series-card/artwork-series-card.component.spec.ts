import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkSeriesCardComponent } from './artwork-series-card.component';

describe('ArtworkSeriesCardComponent', () => {
  let component: ArtworkSeriesCardComponent;
  let fixture: ComponentFixture<ArtworkSeriesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkSeriesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkSeriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

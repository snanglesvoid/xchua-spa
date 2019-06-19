import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkSeriesComponent } from './artwork-series.component';

describe('ArtworkSeriesComponent', () => {
  let component: ArtworkSeriesComponent;
  let fixture: ComponentFixture<ArtworkSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowSimpleComponent } from './slideshow-simple.component';

describe('SlideshowSimpleComponent', () => {
  let component: SlideshowSimpleComponent;
  let fixture: ComponentFixture<SlideshowSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowCursorControllerComponent } from './slideshow-cursor-controller.component';

describe('SlideshowCursorControllerComponent', () => {
  let component: SlideshowCursorControllerComponent;
  let fixture: ComponentFixture<SlideshowCursorControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowCursorControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowCursorControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

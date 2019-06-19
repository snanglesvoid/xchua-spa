import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySpaceComponent } from './gallery-space.component';

describe('GallerySpaceComponent', () => {
  let component: GallerySpaceComponent;
  let fixture: ComponentFixture<GallerySpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerySpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

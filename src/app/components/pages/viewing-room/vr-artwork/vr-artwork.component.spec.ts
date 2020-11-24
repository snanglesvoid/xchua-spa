import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrArtworkComponent } from './vr-artwork.component';

describe('VrArtworkComponent', () => {
  let component: VrArtworkComponent;
  let fixture: ComponentFixture<VrArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

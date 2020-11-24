import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkDisplayBlockComponent } from './artwork-display-block.component';

describe('ArtworkDisplayBlockComponent', () => {
  let component: ArtworkDisplayBlockComponent;
  let fixture: ComponentFixture<ArtworkDisplayBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkDisplayBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkDisplayBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

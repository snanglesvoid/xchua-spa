import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlShelfComponent } from './gl-shelf.component';

describe('GlShelfComponent', () => {
  let component: GlShelfComponent;
  let fixture: ComponentFixture<GlShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

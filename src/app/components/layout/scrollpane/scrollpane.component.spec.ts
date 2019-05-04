import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollpaneComponent } from './scrollpane.component';

describe('ScrollpaneComponent', () => {
  let component: ScrollpaneComponent;
  let fixture: ComponentFixture<ScrollpaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollpaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

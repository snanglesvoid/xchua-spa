import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollpaneSectionComponent } from './scrollpane-section.component';

describe('ScrollpaneSectionComponent', () => {
  let component: ScrollpaneSectionComponent;
  let fixture: ComponentFixture<ScrollpaneSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollpaneSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollpaneSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

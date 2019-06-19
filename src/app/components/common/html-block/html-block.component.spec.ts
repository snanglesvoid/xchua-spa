import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlBlockComponent } from './html-block.component';

describe('HtmlBlockComponent', () => {
  let component: HtmlBlockComponent;
  let fixture: ComponentFixture<HtmlBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

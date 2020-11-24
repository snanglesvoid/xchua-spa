import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextContentBlockComponent } from './text-content-block.component';

describe('TextContentBlockComponent', () => {
  let component: TextContentBlockComponent;
  let fixture: ComponentFixture<TextContentBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextContentBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextContentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

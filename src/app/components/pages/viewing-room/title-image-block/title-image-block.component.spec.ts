import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleImageBlockComponent } from './title-image-block.component';

describe('TitleImageBlockComponent', () => {
  let component: TitleImageBlockComponent;
  let fixture: ComponentFixture<TitleImageBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleImageBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleImageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

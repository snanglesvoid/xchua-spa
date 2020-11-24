import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRoomsComponent } from './viewing-rooms.component';

describe('ViewingRoomsComponent', () => {
  let component: ViewingRoomsComponent;
  let fixture: ComponentFixture<ViewingRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

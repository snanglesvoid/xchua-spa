import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRoomComponent } from './viewing-room.component';

describe('ViewingRoomComponent', () => {
  let component: ViewingRoomComponent;
  let fixture: ComponentFixture<ViewingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

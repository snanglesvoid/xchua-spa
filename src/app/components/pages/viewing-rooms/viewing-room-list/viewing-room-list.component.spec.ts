import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRoomListComponent } from './viewing-room-list.component';

describe('ViewingRoomListComponent', () => {
  let component: ViewingRoomListComponent;
  let fixture: ComponentFixture<ViewingRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

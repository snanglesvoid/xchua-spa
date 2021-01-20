import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRoomListItemComponent } from './viewing-room-list-item.component';

describe('ViewingRoomListItemComponent', () => {
  let component: ViewingRoomListItemComponent;
  let fixture: ComponentFixture<ViewingRoomListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewingRoomListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRoomListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

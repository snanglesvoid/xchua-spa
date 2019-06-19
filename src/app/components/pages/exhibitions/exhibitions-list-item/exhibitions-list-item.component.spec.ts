import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionsListItemComponent } from './exhibitions-list-item.component';

describe('ExhibitionsListItemComponent', () => {
  let component: ExhibitionsListItemComponent;
  let fixture: ComponentFixture<ExhibitionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

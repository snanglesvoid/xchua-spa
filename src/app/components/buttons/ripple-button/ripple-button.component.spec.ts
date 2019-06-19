import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RippleButtonComponent } from './ripple-button.component';

describe('RippleButtonComponent', () => {
  let component: RippleButtonComponent;
  let fixture: ComponentFixture<RippleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RippleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RippleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

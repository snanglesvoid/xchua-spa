import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SociallinksComponent } from './sociallinks.component';

describe('SociallinksComponent', () => {
  let component: SociallinksComponent;
  let fixture: ComponentFixture<SociallinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SociallinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SociallinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

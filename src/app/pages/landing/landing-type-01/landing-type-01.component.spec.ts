import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingType01Component } from './landing-type-01.component';

describe('LandingType01Component', () => {
  let component: LandingType01Component;
  let fixture: ComponentFixture<LandingType01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingType01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingType01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaviwerComponent } from './mediaviwer.component';

describe('MediaviwerComponent', () => {
  let component: MediaviwerComponent;
  let fixture: ComponentFixture<MediaviwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaviwerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaviwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

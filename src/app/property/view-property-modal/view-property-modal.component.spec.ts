import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyModalComponent } from './view-property-modal.component';

describe('ViewPropertyModalComponent', () => {
  let component: ViewPropertyModalComponent;
  let fixture: ComponentFixture<ViewPropertyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPropertyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPropertyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

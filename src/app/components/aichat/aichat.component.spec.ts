/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AichatComponent } from './aichat.component';

describe('AichatComponent', () => {
  let component: AichatComponent;
  let fixture: ComponentFixture<AichatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AichatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AichatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

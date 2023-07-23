import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadKeyComponent } from './keypad-key.component';

describe('KeypadKeyComponent', () => {
  let component: KeypadKeyComponent;
  let fixture: ComponentFixture<KeypadKeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeypadKeyComponent]
    });
    fixture = TestBed.createComponent(KeypadKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

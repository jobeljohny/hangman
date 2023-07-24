import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardToggleComponent } from './keyboard-toggle.component';

describe('KeyboardToggleComponent', () => {
  let component: KeyboardToggleComponent;
  let fixture: ComponentFixture<KeyboardToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyboardToggleComponent]
    });
    fixture = TestBed.createComponent(KeyboardToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

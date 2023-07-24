import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumWarnComponent } from './num-warn.component';

describe('NumWarnComponent', () => {
  let component: NumWarnComponent;
  let fixture: ComponentFixture<NumWarnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumWarnComponent]
    });
    fixture = TestBed.createComponent(NumWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsPageComponent } from './instructions-page.component';

describe('InstructionsPageComponent', () => {
  let component: InstructionsPageComponent;
  let fixture: ComponentFixture<InstructionsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionsPageComponent]
    });
    fixture = TestBed.createComponent(InstructionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

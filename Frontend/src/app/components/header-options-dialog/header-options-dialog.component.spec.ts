import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionsDialogComponent } from './header-options-dialog.component';

describe('HeaderOptionsDialogComponent', () => {
  let component: HeaderOptionsDialogComponent;
  let fixture: ComponentFixture<HeaderOptionsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderOptionsDialogComponent]
    });
    fixture = TestBed.createComponent(HeaderOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

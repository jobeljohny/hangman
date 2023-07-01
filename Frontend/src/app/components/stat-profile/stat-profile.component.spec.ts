import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatProfileComponent } from './stat-profile.component';

describe('StatProfileComponent', () => {
  let component: StatProfileComponent;
  let fixture: ComponentFixture<StatProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatProfileComponent]
    });
    fixture = TestBed.createComponent(StatProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsSliderComponent } from './tips-slider.component';

describe('TipsSliderComponent', () => {
  let component: TipsSliderComponent;
  let fixture: ComponentFixture<TipsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipsSliderComponent]
    });
    fixture = TestBed.createComponent(TipsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
